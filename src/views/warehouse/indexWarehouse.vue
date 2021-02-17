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
    <Table context-menu border :columns="columns" :data="carfiles" show-context-menu
      @on-contextmenu="handleContextMenu"
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
    <Drawer placement="left" :title="'配件ID：'+parts.partsID" v-model="flag" width="720" :mask-closable="true"
      :styles="styles">
      <Form :model="parts">
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="配件名称" label-position="top">
            <Input v-model="parts.partsName" placeholder="please enter user name" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="配件数量" label-position="top">
            <Input v-model="parts.partsNumber" placeholder="please enter user name" />
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="配件售价" label-position="top">
            <Input v-model="parts.partsPrice" placeholder="please enter user name" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="配件进货价" label-position="top">
            <Input v-model="parts.buyingPrice" placeholder="please enter user name" />
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="厂家信息" label-position="top">
            <Input v-model="parts.venderInfo" placeholder="please enter user name" />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button style="margin-right: 8px" @click="flag = false">取消</Button>
      </div>
    </Drawer>
    <router-view></router-view>
  </div>
</template>
<script>
  import * as Handle_part from '@/network/parts'

  export default {
    data() {
      return {
        keywords:'',
        current: 1,
        total: 0,
        pageNum: 5,
        flag: false,
        s_parts:[],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '配件编号',
            key: 'partsID'
          },
          {
            title: '配件名称',
            key: 'partsName',
          },
          {
            title: '配件数量',
            key: 'partsNumber'
          },
          {
            title: '进货厂家信息',
            key: 'venderInfo'
          },
          {
            title: '进货价',
            key: 'buyingPrice'
          },
          {
            title: '销售价',
            key: 'partsPrice'
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
            partsID: 0,
            partsName: "",
            partsNumber: 0,
            partsPrice: 0.0,
            venderInfo: "",
            buyingPrice: 0.0,
            oprationLog: ""
          },
        ],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        parts: {
          partsID: 0,
          partsName: '',
          partsPrice: 0.0,
          buyingPrice: 0.0,
          partsNumber: 0,
          venderInfo: '',
          oprationLog: ''
        },
      }
    },
    created() {
      Handle_part.getPartsData(this.current,this.keywords).then(res => {
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
        Handle_part.getPartsData(this.current,this.keywords).then(res => {
        this.total = res.data.data.total;
        this.current = res.data.data.pageNum;
        let array = [{}];
        array = res.data.data.list;
        this.carfiles = array;
      })
      },
      handle_search(){
        Handle_part.getPartsData(this.current,this.keywords).then(res => {
          if(res.data.code == "500"){
            this.total = 0;
            this.current = 1;
        this.carfiles = [];
          }else{
            this.total = res.data.data.total;
        this.current = res.data.data.pageNum;
        let array = [{}];
        array = res.data.data.list;
        this.carfiles = array;
          }
        })
      },
      changePage(value) {
        Handle_part.getPartsData(value,this.keywords).then(res => {
          this.current = value;
          let array = [{}];
          array = res.data.data.list;
          this.carfiles = array;
        })
      },
      handleModify(index) {
        this.parts = JSON.parse(JSON.stringify(this.carfiles[index]));
        this.flag = true;
      },
      handleSubmit() {
        let parts = JSON.stringify(this.parts);
        Handle_part.modifyPartsData(parts).then(res => {
          alert('修改成功');
          Handle_part.getPartsData(this.current).then(res => {
            let array = [{}];
            array = res.data.data.list;
            this.carfiles = array;
          })
          this.flag = false;
        })
      },
      remove(index) {
        let id = this.carfiles[index].partsID;
        Handle_part.deletePartsDate(id).then(res =>{
          alert("删除成功");
          history.go(0);
        })
      },
      handleContextMenu(row) {
        this.parts = JSON.parse(JSON.stringify(row));;
      },
      handleContextMenuEdit() {
        this.flag = true;
      },
      handleContextMenuDelete() {
        let id = this.parts.partsID;
        Handle_part.deletePartsDate(id).then(res =>{
          alert("删除成功");
          history.go(0);
        })
      },
      handleSelectOne(selection){
        this.s_parts = selection;
      },
      handleDeleteBetch(){
        let ids = [];
        for(let item of this.s_parts){
          ids.push(item.partsID);
        }
        let JSONids = JSON.stringify(ids);
        JSONids = JSONids.substr(0,JSONids.length-1);
        JSONids = JSONids.substr(1,JSONids.length-1);
        Handle_part.deletePartsDate(JSONids).then(res =>{
          alert("删除成功");
          history.go(0);
        })
      }
    }
  }
</script>
<style>
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>