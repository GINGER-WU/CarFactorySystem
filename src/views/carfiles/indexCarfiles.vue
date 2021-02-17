<template>
  <div>
    <Layout>
      <Header style="background-color:transparent;">
        <Button @click="handleDeleteBetch" type="error">批量删除</Button>
        <Poptip placement="right" width="400">
          <Button style="margin-left: 5px;" type="success">搜索</Button>
          <div slot="content">
            <Input style="width: 70%;" v-model="keywords" search placeholder="输入关键字来搜索..." @on-search="handle_search" />
            <Button style="margin-left: 5%" @click="handleClear" ghost type="primary">清除搜索</Button>
          </div>
        </Poptip>
      </Header>
      <Content style="height: 270px;">
        <Table :loading="loading" context-menu border :columns="columns" :data="showitem" show-context-menu>
          <template slot="contextMenu">
            <DropdownItem @click.native="handleContextMenuEdit">详情</DropdownItem>
            <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
          </template>
        </Table>
        <Drawer :closable="false" width="640" v-model="flag">
          <p :style="pStyle">汽车档案ID：{{carInfo.carfileID}}</p>
          <p :style="pStyle">
            <Icon type="ios-man" />客户信息
            <Button @click="handleModifyClient" size="small" ghost type="primary">修改</Button>
          </p>
          <div class="demo-drawer-profile">
            <Row>
              <Col span="12">
              姓名: {{carInfo.memberName}}
              </Col>
              <Col span="12">
              联系电话: {{carInfo.memberPhoneNumeber}}
              </Col>
            </Row>
          </div>
          <Divider />
          <p :style="pStyle">
            <Icon type="ios-car" />车辆信息
            <Button @click="handleModifyCar" size="small" ghost type="primary">修改</Button>
          </p>
          <div class="demo-drawer-profile">
            <Row>
              <Col span="12">
              车牌号: {{carInfo.carNumber}}
              </Col>
              <Col span="12">
              品牌: {{carInfo.carBrand}}
              </Col>
            </Row>
            <Row>
              <Col span="12">
              车系: {{carInfo.carSerie}}
              </Col>
              <Col span="12">
              车型: {{carInfo.carModel}}
              </Col>
            </Row>
          </div>
          <Divider />
          <p :style="pStyle">
            <Icon type="md-speedometer" />车辆进厂信息
            <Button @click="handleModifyInfo" size="small" ghost type="primary">修改</Button>

          </p>
          <div class="demo-drawer-profile">
            <Row>
              <Col span="12">
              里程数: {{carInfo.carMileage}}
              </Col>
              <Col span="12">
              进厂时间: {{carInfo.startService}}
              </Col>
            </Row>
            <Row>
              <Col span="12">
              工时项目: {{carInfo.laborWork}}
              </Col>
              <Col span="12">
              工时费用: {{carInfo.laborCost}}
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <div v-if="carInfo.finishService==null">
                是否出厂: 未出厂
              </div>
              <div v-else>
                是否出厂: 已结账({{carInfo.finishService}})
              </div>
              </Col>
            </Row>
          </div>
          <Divider />
          <p :style="pStyle">
            <Icon type="ios-hammer" />使用工人情况
            <Poptip placement="right" width="100">
              <Button size="small" ghost type="primary">修改</Button>
              <div slot="content" style="text-align: center;">
                <Button v-show="AddWorkerflag == false" @click="handleAddWorker" size="small" ghost
                  type="success">添加</Button>
                <Button v-show="AddWorkerflag == true" @click="handleAddWorker" size="small" ghost
                  type="warning">隐藏</Button>
                &nbsp;
                <Button @click="handleDeleteWorker" size="small" ghost type="error">删除</Button>
              </div>
            </Poptip>
          </p>
          <div v-if="AddWorkerflag">
            <Button @click="handleSubmitWorker" size="small" type="primary">确定</Button>
            &nbsp;
            <Select style="width: 300px;" v-model="submitList" filterable multiple>
              <Option v-for="item in workerList" :value="item.workerID" :key="item.workerName">{{ item.workerName }}
              </Option>
            </Select>
            <br>
            <br>
          </div>
          <div class="demo-drawer-profile">
            <Table border :columns="columnsworker" :data="useWorker"></Table>
          </div>
          <Divider />
          <p :style="pStyle">
            <Icon type="md-cube" />使用配件情况
            <Poptip placement="right" width="100">
              <Button size="small" ghost type="primary">操作</Button>
              <div slot="content" style="text-align: center;">
                <Button @click="handleAddParts" size="small" ghost type="success">添加</Button>
                &nbsp;
                <Button @click="handleModifyParts" size="small" ghost type="primary">修改</Button>
              </div>
            </Poptip>
          </p>
          <div class="demo-drawer-profile">
            <Table border :columns="columnsparts" :data="useParts"></Table>
          </div>
          <br>
          <p :style="pStyle">
            <font size="5">总费用：{{carInfo.totalCost}}元</font>
          </p>
          <Button v-if="carInfo.finishService==null" @click="handleCheckOut" long size="large"
            type="success">结账</Button>
        </Drawer>
        <Drawer placement="left" :closable="false" width="840" v-model="AddPartsFlag">
          <parts ref="childparts" :plist="useParts" :cfid="carInfo.carfileID" @click_submit="handle_submit"></parts>
        </Drawer>
      </Content>
      <Footer>
        <div style="text-align: right;">
          <Page :total="total" :page-size="pageNum" @on-change="changePage" show-total />
        </div>
      </Footer>
    </Layout>
  </div>
</template>
<script>
  import parts from '@/components/drawerfittings'
  import * as Handle_carfiles from '@/network/carfiles'
  export default {
    data() {
      return {
        AddPartsFlag: false,
        keywords: '',
        submitList: [],
        workerList: [],
        AddWorkerflag: false,
        loading: true,
        current: 1,
        total: 0,
        pageNum: 5,
        carInfo: {},
        useWorker: [],
        useParts: [],
        flag: false,
        pStyle: {
          fontSize: '16px',
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '24px',
          display: 'block',
          marginBottom: '16px'
        },
        columnsworker: [
          {
            title: '工人编号',
            key: 'workerID'
          },
          {
            title: '工人姓名',
            key: 'workerName'
          }
        ],
        columnsparts: [
          {
            title: '配件编号',
            key: 'partsID'
          },
          {
            title: '配件名称',
            key: 'partsName'
          },
          {
            title: '配件单价',
            key: 'partsPrice'
          },
          {
            title: '使用数量',
            key: 'useNumber'
          }
        ],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '档案编号',
            key: 'carfileID'
          },
          {
            title: '客户名称',
            key: 'memberName',
          },
          {
            title: '车牌号码',
            key: 'carNumber'
          },
          {
            title: '车型',
            key: 'carBrand'
          },
          {
            title: '客户联系电话',
            key: 'memberPhoneNumber'
          },
          {
            title: '进厂时间',
            key: 'startService'
          },
          {
            title: '车辆状态',
            key: 'status'
          },
          {
            title: 'Action',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        carfiles: [
          {
            recordID: 0,
            carfileID: 0,
            carMileage: 0,
            laborWork: "",
            laborCost: 0.0,
            startService: "",
            finishService: "",
            totalCost: 0.0,
            carNumber: "",
            workerID: null,
            partsID: null,
            usePartsCount: null,
            memberPhoneNumber: "",
          }],
        showitem: [
          {
          }
        ],
      }
    },
    components: {
      parts
    },
    methods: {
      handle_submit(item) {
        this.useParts = this.useParts.concat(item);
        let totalprice = 0;
        for (let item of this.useParts) {
          totalprice += item.useNumber * item.partsPrice
        }
        totalprice += this.carInfo.laborCost;
        this.carInfo.totalCost = totalprice;
        this.AddPartsFlag = false;
        this.$Message["success"]({
          background: true,
          content: '添加成功'
        });
      },
      handleClear() {
        this.keywords = '';
        this.loading = true;
        Handle_carfiles.getCarfilesData(this.current, this.keywords).then(res => {
          let item = [];
          this.total = res.data.data.total;
          this.current = res.data.data.pageNum;
          this.carfiles = res.data.data.list;
          let name = [];
          let carbrand = [];
          let i = 0;
          for (let iterator of this.carfiles) {
            Handle_carfiles.get_info(iterator.memberPhoneNumber, iterator.carNumber).then(res => {
              name.push(res.data.data[0]);
              carbrand.push(res.data.data[1]);
            })
            if (iterator.finishService != null) {
              setTimeout(() => {
                item.push({
                  carfileID: iterator.carfileID,
                  carNumber: iterator.carNumber,
                  carBrand: carbrand[i],
                  startService: iterator.startService,
                  memberPhoneNumber: iterator.memberPhoneNumber,
                  memberName: name[i],
                  status: '已结账'
                });
                i++;
              }, 700)
            }
            else {
              setTimeout(() => {
                item.push({
                  carfileID: iterator.carfileID,
                  carNumber: iterator.carNumber,
                  carBrand: carbrand[i],
                  startService: iterator.startService,
                  memberPhoneNumber: iterator.memberPhoneNumber,
                  memberName: name[i],
                  status: '未结账'
                });
                i++;
              }, 700)
            }
          }
          setTimeout(() => {
            this.loading = false;
          }, 700)
          this.showitem = item;
        })
      },
      handle_search() {
        this.loading = true;
        Handle_carfiles.getCarfilesData(1, this.keywords).then(res => {
          if (res.data.code === "500") {
            this.total = 0;
            this.current = 1;
            this.carfiles = [];
            this.showitem = [];
          }
          else {
            let item = [];
            this.total = res.data.data.total;
            this.current = res.data.data.pageNum;
            this.carfiles = res.data.data.list;
            let name = [];
            let carbrand = [];
            let i = 0;
            for (let iterator of this.carfiles) {
              Handle_carfiles.get_info(iterator.memberPhoneNumber, iterator.carNumber).then(res => {
                name.push(res.data.data[0]);
                carbrand.push(res.data.data[1]);
              })
              if (iterator.finishService != null) {
                setTimeout(() => {
                  item.push({
                    carfileID: iterator.carfileID,
                    carNumber: iterator.carNumber,
                    carBrand: carbrand[i],
                    startService: iterator.startService,
                    memberPhoneNumber: iterator.memberPhoneNumber,
                    memberName: name[i],
                    status: '已结账'
                  });
                  i++;
                }, 700)
              }
              else {
                setTimeout(() => {
                  item.push({
                    carfileID: iterator.carfileID,
                    carNumber: iterator.carNumber,
                    carBrand: carbrand[i],
                    startService: iterator.startService,
                    memberPhoneNumber: iterator.memberPhoneNumber,
                    memberName: name[i],
                    status: '未结账'
                  });
                  i++;
                }, 700)
              }
            }
            this.showitem = item;
          }
          setTimeout(() => {
            this.loading = false;
          }, 700)
        })
      },
      modifyDeleteWorker(index) {
      },
      show(index) {
        this.ld = true;
        Promise.all([Handle_carfiles.getCarInfo(this.showitem[index].carfileID),
        Handle_carfiles.getUseWorkers(this.showitem[index].carfileID),
        Handle_carfiles.getUseParts(this.showitem[index].carfileID)]).then(res => {
          this.carInfo = res[0].data.data;
          this.useWorker = res[1].data.data;
          this.useParts = res[2].data.data;
        })
        // Handle_carfiles.getCarInfo(this.showitem[index].carfileID).then(res => {
        //   this.carInfo = res.data.data;
        // }).then(res => {
        //   Handle_carfiles.getUseWorkers(this.showitem[index].carfileID).then(res => {
        //     this.useWorker = res.data.data;
        //   })
        // }).then(res => {
        //   Handle_carfiles.getUseParts(this.showitem[index].carfileID).then(res => {
        //     this.$nextTick(() => {
        //       this.useParts = res.data.data;
        //     })
        //   })
        // })
        setTimeout(() => {
          this.flag = true;
        }, 500)

      },
      remove(index) {
        this.carfiles.splice(index, 1);
      },
      handleModifyClient() {
        let that = this;
        let modifyMember = {
          memberID: JSON.parse(JSON.stringify(that.carInfo.memberID)),
          memberName: JSON.parse(JSON.stringify(that.carInfo.memberName)),
          memberPhonenumber: JSON.parse(JSON.stringify(that.carInfo.memberPhoneNumeber)),
        }
        this.$Modal.confirm({
          render: (h) => {
            return h('Form', {
              props: {
                model: modifyMember,
                ref: modifyMember
              }
            }, [
              h('FormItem', {
                props: {
                  label: "客户姓名",
                }
              }, [h('Input', {
                props: {
                  value: modifyMember.memberName,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyMember.memberName = val;
                  }
                }
              })]),
              h('FormItem', {
                props: {
                  label: "联系电话"
                }
              }, [h('Input', {
                props: {
                  value: modifyMember.memberPhonenumber,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyMember.memberPhonenumber = val;
                  }
                }
              })])
            ])
          },
          onOk() {
            let JSONmodifyMember = JSON.stringify(modifyMember);
            this.carInfo.memberName = modifyMember.memberName;
            this.carInfo.memberPhoneNumeber;
            Handle_carfiles.modifyMemberData(JSONmodifyMember, that.carInfo.carfileID).then(() => {
              alert('修改成功');
              history.go(0);
            })
          }
        })
      },
      handleModifyCar() {
        let that = this;
        let modifyCar = {
          carNo: JSON.parse(JSON.stringify(that.carInfo.carNo)),
          carNumber: JSON.parse(JSON.stringify(that.carInfo.carNumber)),
          carBrand: JSON.parse(JSON.stringify(that.carInfo.carBrand)),
          carSerie: JSON.parse(JSON.stringify(that.carInfo.carSerie)),
          carModel: JSON.parse(JSON.stringify(that.carInfo.carModel))
        }
        this.$Modal.confirm({
          render: (h) => {
            return h('Form', {
              props: {
                model: modifyCar,
                ref: modifyCar
              }
            }, [
              h('FormItem', {
                props: {
                  label: "车牌号码",
                }
              }, [h('Input', {
                props: {
                  value: modifyCar.carNumber,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyCar.carNumber = val;
                  }
                }
              })]),
              h('FormItem', {
                props: {
                  label: "车辆品牌"
                }
              }, [h('Input', {
                props: {
                  value: modifyCar.carBrand,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyCar.carBrand = val;
                  }
                }
              })]),
              h('FormItem', {
                props: {
                  label: "车系"
                }
              }, [h('Input', {
                props: {
                  value: modifyCar.carSerie,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyCar.carSerie = val;
                  }
                }
              })]),
              h('FormItem', {
                props: {
                  label: "车型"
                }
              }, [h('Input', {
                props: {
                  value: modifyCar.carModel,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyCar.carModel = val;
                  }
                }
              })])
            ])
          },
          onOk() {
            let JSONmodifyCar = JSON.stringify(modifyCar);
            Handle_carfiles.modifyCarData(JSONmodifyCar, that.carInfo.carfileID).then(() => {
              alert('修改成功');
              history.go(0);
            })
          }
        })
      },
      handleModifyInfo() {
        let that = this;
        let modifyInfo = {
          carMileage: JSON.parse(JSON.stringify(that.carInfo.carMileage)),
          laborWork: JSON.parse(JSON.stringify(that.carInfo.laborWork)),
          laborCost: JSON.parse(JSON.stringify(that.carInfo.laborCost)),
          startService: JSON.parse(JSON.stringify(that.carInfo.startService))
        }
        this.$Modal.confirm({
          render: (h) => {
            return h('Form', {
              props: {
                model: modifyInfo,
                ref: modifyInfo
              }
            }, [
              h('FormItem', {
                props: {
                  label: "里程数",
                }
              }, [h('Input', {
                props: {
                  value: modifyInfo.carMileage,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyInfo.carMileage = val;
                  }
                }
              })]),
              h('FormItem', {
                props: {
                  label: "工时项目"
                }
              }, [h('Input', {
                props: {
                  value: modifyInfo.laborWork,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyInfo.laborWork = val;
                  }
                }
              })]),
              h('FormItem', {
                props: {
                  label: "工时费用"
                }
              }, [h('Input', {
                props: {
                  value: modifyInfo.laborCost,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyInfo.laborCost = val;
                  }
                }
              })]),
              h('FormItem', {
                props: {
                  label: "进厂时间"
                }
              }, [h('DatePicker', {
                props: {
                  value: modifyInfo.startService,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    modifyInfo.startService = this.$moment(val).format("YYYY-MM-DD");
                  }
                }
              })])
            ])
          },
          onOk() {
            let JSONmodifyInfo = JSON.stringify(modifyInfo);
            Handle_carfiles.modifyInfoData(JSONmodifyInfo, that.carInfo.carfileID).then(() => {
              alert('修改成功');
              history.go(0);
            })
          }
        })
      },
      handleDeleteWorker() {
        let c_worker = JSON.parse(JSON.stringify(this.columnsworker));
        let u_worker = JSON.parse(JSON.stringify(this.useWorker));
        c_worker.push({
          title: '操作',
          key: 'action',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    Handle_carfiles.deleteWorkerData(u_worker[params.index].workerID, this.carInfo.carfileID).then(() => {
                      this.$Message["success"]({
                        background: true,
                        content: '删除成功'
                      });
                      u_worker.splice(params.index, 1);
                      this.useWorker = u_worker;
                    })
                    this.$Modal.remove();
                  }
                }
              }, '删除'),
            ]);
          }
        })
        this.$Modal.confirm({
          width: '400px',
          render: (h, params) => {
            return h('div', [
              h('Table', {
                props: {
                  columns: c_worker,
                  data: u_worker
                }
              })
            ])
          },
        })
      },
      handleAddWorker() {
        Handle_carfiles.getWorkerList(1, 100).then((res) => {
          this.workerList = res.data.data.list;
        })
        this.AddWorkerflag = !this.AddWorkerflag;
      },
      handleSubmitWorker() {
        let JSONids = JSON.stringify(this.submitList);
        JSONids = JSONids.substr(0, JSONids.length - 1);
        JSONids = JSONids.substr(1, JSONids.length - 1);
        Handle_carfiles.addWorkerData(JSONids, this.carInfo.carfileID).then(() => {
          alert('添加成功');
          history.go(0);
        })
      },
      handleModifyParts() {
        let that = this;
        let c_parts = JSON.parse(JSON.stringify(this.columnsparts));
        let u_parts = JSON.parse(JSON.stringify(this.useParts));
        c_parts.splice(3, 1, {
          title: '使用数量',
          key: 'useNumber',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: u_parts[params.index].useNumber,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    u_parts[params.index].useNumber = val;
                  }
                }
              })
            ]);
          }
        })
        c_parts.push({
          title: '操作',
          key: 'action',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    Handle_carfiles.deletePartsData(u_parts[params.index].partsID, this.carInfo.carfileID).then(() => {
                      this.$Message["success"]({
                        background: true,
                        content: '删除成功'
                      });
                      u_parts.splice(params.index, 1);
                      this.useParts = u_parts;
                      let totalprice = 0;
                      for (let item of this.useParts) {
                        totalprice += item.useNumber * item.partsPrice
                      }
                      totalprice += this.carInfo.laborCost;
                      this.carInfo.totalCost = totalprice;
                    })
                    this.$Modal.remove();
                  }
                }
              }, '删除'),
            ]);
          }
        })
        this.$Modal.confirm({
          width: '600px',
          render: (h, params) => {
            return h('div', [
              h('Table', {
                props: {
                  columns: c_parts,
                  data: u_parts
                }
              })
            ])
          },
          onOk() {
            let submitList = [];
            for (let iterator of u_parts) {
              submitList.push({
                partsID: iterator.partsID,
                usePartsCount: iterator.useNumber
              })
            }
            let JSONsubmitList = JSON.stringify(submitList);
            Handle_carfiles.modifyUseNumberData(JSONsubmitList, that.carInfo.carfileID).then(() => {
              this.$Message["success"]({
                background: true,
                content: '修改成功'
              });
              that.useParts = u_parts;
            })
          }
        })
      },
      handleAddParts() {
        this.AddPartsFlag = !this.AddPartsFlag;
        this.$refs["childparts"].init();
      },
      handleContextMenuEdit() {
      },
      handleContextMenuDelete() {

      },
      handleDeleteBetch() {

      },
      handleCheckOut() {
        Handle_carfiles.checkout(this.carInfo.carfileID).then(() => {
          alert("结账成功");
          history.go(0);
        })
      },
      changePage(value) {
        this.loading = true;
        Handle_carfiles.getCarfilesData(value, this.keywords).then(res => {
          this.current = value;
          let item = [];
          this.total = res.data.data.total;
          this.current = res.data.data.pageNum;
          this.carfiles = res.data.data.list;
          let name = [];
          let carbrand = [];
          let i = 0;
          for (let iterator of this.carfiles) {
            Handle_carfiles.get_info(iterator.memberPhoneNumber, iterator.carNumber).then(res => {
              name.push(res.data.data[0]);
              carbrand.push(res.data.data[1]);
            })
            if (iterator.finishService != null) {
              setTimeout(() => {
                item.push({
                  carfileID: iterator.carfileID,
                  carNumber: iterator.carNumber,
                  carBrand: carbrand[i],
                  startService: iterator.startService,
                  memberPhoneNumber: iterator.memberPhoneNumber,
                  memberName: name[i],
                  status: '已结账'
                });
                i++;
              }, 700)
            }
            else {
              setTimeout(() => {
                item.push({
                  carfileID: iterator.carfileID,
                  carNumber: iterator.carNumber,
                  carBrand: carbrand[i],
                  startService: iterator.startService,
                  memberPhoneNumber: iterator.memberPhoneNumber,
                  memberName: name[i],
                  status: '未结账'
                });
                i++;
              }, 700)
            }
          }
          setTimeout(() => {
            this.loading = false;
          }, 700)
          this.showitem = item;
        })
      },
    },
    created() {
      Handle_carfiles.getCarfilesData(this.current, this.keywords).then(res => {
        let item = [];
        this.total = res.data.data.total;
        this.current = res.data.data.pageNum;
        this.carfiles = res.data.data.list;
        let name = [];
        let carbrand = [];
        let i = 0;
        for (let iterator of this.carfiles) {
          Handle_carfiles.get_info(iterator.memberPhoneNumber, iterator.carNumber).then(res => {
            name.push(res.data.data[0]);
            carbrand.push(res.data.data[1]);
          })
          if (iterator.finishService != null) {
            setTimeout(() => {
              item.push({
                carfileID: iterator.carfileID,
                carNumber: iterator.carNumber,
                carBrand: carbrand[i],
                startService: iterator.startService,
                memberPhoneNumber: iterator.memberPhoneNumber,
                memberName: name[i],
                status: '已结账'
              });
              i++;
            }, 700)
          }
          else {
            setTimeout(() => {
              item.push({
                carfileID: iterator.carfileID,
                carNumber: iterator.carNumber,
                carBrand: carbrand[i],
                startService: iterator.startService,
                memberPhoneNumber: iterator.memberPhoneNumber,
                memberName: name[i],
                status: '未结账'
              });
              i++;
            }, 700)
          }
        }
        setTimeout(() => {
          this.loading = false;
        }, 700)
        this.showitem = item;
      })
    },
  }
</script>