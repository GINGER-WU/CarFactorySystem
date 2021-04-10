<template>
  <div>
    <Button @click="handleDeleteBetch" type="error">批量删除</Button>
    <Poptip placement="right" width="400">
      <Button style="margin-left: 5px;" type="success">搜索</Button>
      <div slot="content">
        <Input style="width: 70%;" v-model="keywords" search placeholder="输入关键字来搜索..." @on-search="handle_search" />
        <Button style="margin-left: 5%" @click="handleClear" ghost type="primary">清除搜索</Button>
      </div>
    </Poptip>
    <br>
    <br>
    <Table context-menu border :columns="columns" :data="carfiles" show-context-menu @on-contextmenu="handleContextMenu"
      @on-selection-change="handleSelectOne">
      <template slot="contextMenu">
        <DropdownItem @click.native="handleContextMenuEdit">修改</DropdownItem>
        <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
      </template>
    </Table>
    <br>
    <div style="text-align: right;">
      <Page :total="total" :page-size="pageNum" @on-change="changePage" show-total />
    </div>
    <Drawer placement="left" :title="'员工ID：'+worker.workerID" v-model="flag" width="720" :mask-closable="true"
      :styles="styles">
      <Form :model="worker">
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="员工姓名" label-position="top">
            <Input v-model="worker.workerName" placeholder="please enter user name" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="员工性别" label-position="top">
            <Input v-model="worker.workerSex" placeholder="please enter user name" />
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="员工联系电话" label-position="top">
            <Input v-model="worker.workerPhoneNumber" placeholder="please enter user name" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="员工身份证号码" label-position="top">
            <Input v-model="worker.workerIdcarNumber" placeholder="please enter user name" />
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="员工上岗时间" label-position="top">
            <DatePicker type="date" placeholder="Select date" @on-change="datechange" v-model="worker.firstworkTime">
            </DatePicker>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button style="margin-right: 8px" @click="flag = false">取消</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
  import * as Handle_worker from '@/network/worker'

  export default {
    data() {
      return {
        keywords: '',
        current: 1,
        total: 0,
        pageNum: 5,
        flag: false,
        s_workers: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '员工编号',
            key: 'workerID'
          },
          {
            title: '员工姓名',
            key: 'workerName',
          },
          {
            title: '员工性别',
            key: 'workerSex'
          },
          {
            title: '员工联系电话',
            key: 'workerPhoneNumber'
          },
          {
            title: '员工身份证号码',
            key: 'workerIdcarNumber'
          },
          {
            title: '入职时间',
            key: 'firstworkTime'
          },
          {
            title: '是否正在工作',
            key: 'workingNumber'
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
                      this.handleModify(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        carfiles: [
          {
            workerID: 0,
            workerName: '',
            workerSex: '',
            workerPhoneNumber: '',
            workerIdcarNumber: '',
            firstworkTime: '',
          },
        ],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        worker: {
          workerID: 0,
          workerName: '',
          workerSex: '',
          workerPhoneNumber: '',
          workerIdcarNumber: '',
          firstworkTime: '',
        },
      }
    },
    created() {
      Handle_worker.getWorkersData(this.current, this.keywords).then(res => {
        this.total = res.data.data.total;
        this.current = res.data.data.pageNum;
        let array = [{}];
        array = res.data.data.list;
        this.carfiles = array;
      })
    },
    methods: {
      handleClear(){
        this.keywords = '';
        Handle_worker.getWorkersData(this.current, this.keywords).then(res => {
        this.total = res.data.data.total;
        this.current = res.data.data.pageNum;
        let array = [{}];
        array = res.data.data.list;
        this.carfiles = array;
      })
      },
      handle_search() {
        Handle_worker.getWorkersData(this.current, this.keywords).then(res => {
          if (res.data.code == "500") {
            this.total = 0;
            this.current = 1;
            this.carfiles = [];
          } else {
            this.total = res.data.data.total;
            this.current = res.data.data.pageNum;
            let array = [{}];
            array = res.data.data.list;
            this.carfiles = array;
          }
        })
      },
      changePage(value) {
        Handle_worker.getWorkersData(value, this.keywords).then(res => {
          this.current = value;
          let array = [{}];
          array = res.data.data.list;
          this.carfiles = array;
        })
      },
      handleModify(index) {
        this.worker = JSON.parse(JSON.stringify(this.carfiles[index]));
        this.flag = true;
      },
      handleSubmit() {
        let worker = JSON.stringify(this.worker);
        Handle_worker.modifyWorkersData(worker).then(res => {
          alert('修改成功');
          Handle_worker.getWorkersData(this.current).then(res => {
            let array = [{}];
            array = res.data.data.list;
            this.carfiles = array;
          })
          this.flag = false;
        })
      },
      remove(index) {
        let id = this.carfiles[index].workerID;
        Handle_worker.deleteWorkersDate(id).then(res => {
          alert("删除成功");
          history.go(0);
        })
      },
      handleContextMenu(row) {
        this.worker = JSON.parse(JSON.stringify(row));;
      },
      handleContextMenuEdit() {
        this.flag = true;
      },
      handleContextMenuDelete() {
        let id = this.worker.workerID;
        Handle_worker.deleteWorkersDate(id).then(res => {
          alert("删除成功");
          history.go(0);
        })
      },
      handleSelectOne(selection) {
        this.s_workers = selection;
      },
      handleDeleteBetch() {
        let ids = [];
        for (let item of this.s_workers) {
          ids.push(item.workerID);
        }
        let JSONids = JSON.stringify(ids);
        JSONids = JSONids.substr(0, JSONids.length - 1);
        JSONids = JSONids.substr(1, JSONids.length - 1);
        Handle_worker.deleteWorkersDate(JSONids).then(res => {
          alert("删除成功");
          history.go(0);
        })
      },
      datechange(date) {
        this.worker.firstworkTime = date;
      }
    }
  }
</script>