<template>
  <div>
    <Form ref="formDynamic" :model="formDynamic" :label-width="120" inline>
      <Button type="success" @click="handleAdd" icon="md-add">配件</Button>
      <Button type="primary" @click="handleSubmit" style="margin-left: 8px">提交</Button>
      <br>
      <br>
      <FormItem v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :label="'配件 ' + item.index"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
        <Button type="text" @click="handleRemove(index)">
          <Icon color="red" type="md-close" />
        </Button>
        <br>
        <FormItem label="配件编号">
          <Input disabled v-model="item.parts.partsID" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="配件名称">
          <Input disabled v-model="item.parts.partsName" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="进货厂家信息">
          <Input disabled v-model="item.parts.venderInfo" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="销售价">
          <Input disabled v-model="item.parts.partsPrice" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="使用数量">
          <Input v-model="item.parts.usePartsCount" placeholder="Enter something..."></Input>
        </FormItem>
      </FormItem>
    </Form>
    <Drawer placement="left" style="z-index: 10000;position: absolute;" :closable="false" width="720" v-model="flag">
      <Table border :columns="columns" :data="showList" @on-selection-change="handleSelectOne">
      </Table>
    </Drawer>
  </div>
</template>
<script>
  import * as Handle_carfiles from '@/network/carfiles'
  export default {
    data() {
      return {
        flag: false,
        index: 0,
        formDynamic: {
          items: [
            {
              status: 0,
              index: 1,
              parts: {
                partsID:0,
                partsName: "",
                usePartsCount: 0,
                partsPrice: 0.0,
                venderInfo: "",
              }
            }
          ]
        },
        optionsList: [],
        showList:[],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '配件编号',
            key: "partsID",
            align: 'center'
          },
          {
            title: '配件名称',
            key: 'partsName',
            align: 'center'
          },
          {
            title: '配件数量',
            key: 'partsNumber',
            align: 'center'
          },
          {
            title: '进货厂家信息',
            key: 'venderInfo',
            align: 'center'
          },
          {
            title: '销售价',
            key: 'partsPrice',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
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
                }, '添加'),
              ]);
            }
          }
        ],
      }
    },
    props:{
      cfid:{
        type:Number,
        default:0
      },
      plist:{
        type:Array,
        default:[]
      }
    },
    methods: {
      init(){
        this.index = 0;
        this.formDynamic = {
          items: [
            {
              status: 0,
              index: 1,
              parts: {
                partsID:0,
                partsName: "",
                usePartsCount: 0,
                partsPrice: 0.0,
                venderInfo: "",
              }
            }
          ]
        };
        Handle_carfiles.getPartsData(1,10000).then(res => {
        for (let item of res.data.data.list) {
          this.$nextTick(() => {
            item['is_show'] = true;
          })
        }
        this.optionsList = res.data.data.list;
      })
      },
      handleSubmit() {
        let submitParts = [];
        let sendParts = [];
        for(let item of this.formDynamic.items){
          if(item.status==1){
            submitParts.push({
              partsID: item.parts.partsID,
              usePartsCount: item.parts.usePartsCount
            })
            sendParts.push({
              partsID: item.parts.partsID,
              partsName: item.parts.partsName,
              partsPrice: item.parts.partsPrice,
              useNumber: item.parts.usePartsCount,
            })
          }
        }
        let JSONparts = JSON.stringify(submitParts);
        Handle_carfiles.addPartsData(JSONparts,this.cfid).then(()=>{
          this.$emit('click_submit',sendParts);
        })
      },
      handleAdd() {
        let plist = JSON.parse(JSON.stringify(this.plist));
        this.flag = !this.flag;
        let s_list = JSON.parse(JSON.stringify(this.optionsList));
        for(let i in plist){
          for(let j in s_list){
            if(plist[i].partsID === s_list[j].partsID){
              s_list.splice(j,1);
            }
          }
        }
        for (let i = 0; i < s_list.length; i++) {
          if(s_list[i].is_show==false){
            s_list.splice(i,1);
            i--;
          }
        }
        this.showList = JSON.parse(JSON.stringify(s_list));
      },
      handleModify(index) {
        this.index++;
        this.formDynamic.items.push({
          index: this.index,
          status: 1,
          parts: {
            partsID: this.showList[index].partsID,
            partsName: this.showList[index].partsName,
            usePartsCount: 0,
            partsPrice: this.showList[index].partsPrice,
            venderInfo: this.showList[index].venderInfo,
          }
        });
        for (let i = 0; i < this.optionsList.length; i++) {
          if(this.optionsList[i].partsID==this.showList[index].partsID){
            this.optionsList[i].is_show = false;
          }
        }
        this.flag =!this.flag;
      },
      handleRemove(index) {
        this.formDynamic.items[index].status = 0;
        for(let i=0;i<this.optionsList.length;i++){
          if(this.formDynamic.items[index].parts.partsID==this.optionsList[i].partsID){
            this.optionsList[i].is_show = true;
          }
        }
      },
      handleSelectOne() {

      }
    },
    created() {
      Handle_carfiles.getPartsData(1,10000).then(res => {
        for (let item of res.data.data.list) {
          this.$nextTick(() => {
            item['is_show'] = true;
          })
        }
        this.optionsList = res.data.data.list;
      })
    },
  }
</script>