<template>
  <div>
  <Table context-menu border :columns="columns" :data="carfiles" show-context-menu>
    <template slot="contextMenu">
      <DropdownItem @click.native="handleContextMenuEdit">修改</DropdownItem>
      <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
    </template>
  </Table>
  <br>
  <router-view></router-view>
</div>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
        {
            title: '配件编号',
            key: 'fittingsNo'
          },
          {
            title: '配件名称',
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
            title: '配件数量',
            key: 'count'
          },
          {
            title: '进货厂家信息',
            key: 'information'
          },
          {
            title: '进货价',
            key: 'cost'
          },
          {
            title: '销售价',
            key: 'price'
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
            fittingsNo:'20211',
            name: '机油格',
            count: 50,
            information: '志怀配件',
            cost: '10',
            price: '50',
          },
          {
            fittingsNo:'20222',
            name: '机油',
            count: 100,
            information: '志怀配件',
            cost: '100',
            price: '500',
          },
          {
            fittingsNo:'20233',
            name: '风格',
            count: 50,
            information: '志怀配件',
            cost: '10',
            price: '50',
          },
          {
            fittingsNo:'20244',
            name: '刹车片',
            count: 50,
            information: '志怀配件',
            cost: '10',
            price: '70',
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