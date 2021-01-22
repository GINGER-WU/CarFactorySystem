<template>
  <div>
    <Button @click="handleDeleteBetch" type="error">批量删除</Button>
    <br>
    <br>
    <Table context-menu border :columns="columns" :data="carfiles" show-context-menu @on-contextmenu="handleContextMenu"
      @on-selection-change="handleSelectOne">
      <template slot="contextMenu">
        <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
      </template>
    </Table>
    <br>
    <div style="text-align: right;">
      <Page :total="total" :page-size="pageNum" @on-change="changePage" show-total />
    </div>
  </div>
</template>
<script>
  import * as Handle_member from '@/network/member'

  export default {
    data() {
      return {
        current: 1,
        total: 0,
        pageNum: 5,
        flag: false,
        s_members: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '会员编号',
            key: 'memberID'
          },
          {
            title: '会员姓名',
            key: 'memberName',
          },
          {
            title: '会员性别',
            key: 'memberSex'
          },
          {
            title: '会员联系电话',
            key: 'memberPhonenumber'
          },
          {
            title: '会员生日',
            key: 'memberBirthday'
          },
          {
            title: '加入时间',
            key: 'joinDate'
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
        ],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        member: {
        },
      }
    },
    created() {
      Handle_member.getMembersData(this.current).then(res => {
        this.total = res.data.data.total;
        this.current = res.data.data.pageNum;
        let array = [{}];
        array = res.data.data.list;
        this.carfiles = array;
      })
    },
    methods: {
      changePage(value) {
        Handle_member.getMembersData(value).then(res => {
          this.current = value;
          let array = [{}];
          array = res.data.data.list;
          this.carfiles = array;
        })
      },
      remove(index) {
        let id = this.carfiles[index].memberID;
        Handle_member.deleteMembersDate(id).then(res => {
          alert("删除成功");
          history.go(0);
        })
      },
      handleContextMenu(row) {
        this.member = JSON.parse(JSON.stringify(row));;
      },
      handleContextMenuDelete() {
        let id = this.member.memberID;
        Handle_member.deleteMembersDate(id).then(res => {
          alert("删除成功");
          history.go(0);
        })
      },
      handleSelectOne(selection) {
        this.s_members = selection;
      },
      handleDeleteBetch() {
        let ids = [];
        for (let item of this.s_members) {
          ids.push(item.memberID);
        }
        let JSONids = JSON.stringify(ids);
        JSONids = JSONids.substr(0, JSONids.length - 1);
        JSONids = JSONids.substr(1, JSONids.length - 1);
        Handle_member.deleteMembersDate(JSONids).then(res => {
          alert("删除成功");
          history.go(0);
        })
      },
      datechange(date){
        this.worker.firstworkTime = date;
      }
    }
  }
</script>