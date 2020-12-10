<template>
  <Table context-menu border :columns="columns" :data="carfiles" show-context-menu>
    <template slot="contextMenu">
      <DropdownItem @click.native="handleContextMenuEdit">修改</DropdownItem>
      <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
    </template>
  </Table>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            title:'会员编号',
            key:'memberNo'
          },
          {
            title: '会员姓名',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '会员性别',
            key: 'sex'
          },
          {
            title: '会员联系电话',
            key: 'phoneNumber'
          },
          {
            title: '会员生日',
            key: 'birthday'
          },
          {
            title: '加入时间',
            key: 'time'
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
            memberNo: '201001',
            name: 'John Brown',
            sex: '女',
            phoneNumber: '13851211111',
            birthday: '1999年7月2日',
            time: '2020-11-29 16:40:04',
          },
          {
            memberNo: '201001',
            name: 'Jim Green',
            sex: '男',
            phoneNumber: '13851211221',
            birthday: '1999年7月2日',
            time: '2020-11-29 16:40:04',
          },
          {
            memberNo: '201001',
            name: 'Joe Black',
            sex: '女',
            phoneNumber: '1385121133311',
            birthday: '1999年7月2日',
            time: '2020-11-29 16:40:04',
          },
          {
            memberNo: '201001',
            name: 'Jon Snow',
            sex: '女',
            phoneNumber: '138512134555',
            birthday: '1999年7月2日',
            time: '2020-11-29 16:40:04',
          }
        ]
      }
    },
    methods: {
      show(index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.carfiles[index].name}<br>Age：${this.carfiles[index].age}<br>Address：${this.carfiles[index].address}`
        })
      },
      remove(index) {
        this.carfiles.splice(index, 1);
      }
    }
  }
</script>