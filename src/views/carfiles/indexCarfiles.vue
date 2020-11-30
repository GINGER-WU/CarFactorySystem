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
            title: '档案编号',
            key: 'carfileNo'
          },
          {
            title: '客户名称',
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
            title: '车牌号码',
            key: 'carNo'
          },
          {
            title: '车型',
            key: 'carType'
          },
          {
            title: '客户联系电话',
            key: 'phoneNumber'
          },
          {
            title: '进厂时间',
            key: 'time'
          },
          {
            title: '车辆状态',
            key: 'state'
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
            carfileNo: 's0121111',
            name: 'John Brown',
            carNo: '粤S885411',
            carType: '奥迪',
            phoneNumber: '13851211111',
            time: '2020-11-29 16:40:04',
            state: '未出厂'
          },
          {
            carfileNo: 's0121222',
            name: 'Jim Green',
            carNo: '粤S885412',
            carType: '奥迪',
            phoneNumber: '13851211111',
            time: '2020-11-29 16:40:04',
            state: '未出厂'
          },
          {
            carfileNo: 's0121333',
            name: 'Joe Black',
            carNo: '粤S885411',
            carType: '奥迪',
            phoneNumber: '13851211111',
            time: '2020-11-29 16:40:04',
            state: '未出厂'
          },
          {
            carfileNo: 's0121444',
            name: 'Jon Snow',
            carNo: '粤S885411',
            carType: '奥迪',
            phoneNumber: '13851211111',
            time: '2020-11-29 16:40:04',
            state: '未出厂'
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