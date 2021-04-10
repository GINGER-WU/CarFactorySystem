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
        <FormItem label="配件名称">
          <Input v-model="item.parts.partsName" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="进货量">
          <Input v-model="item.parts.partsNumber" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="进货厂家信息">
          <Input v-model="item.parts.venderInfo" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="进货价">
          <Input v-model="item.parts.buyingPrice" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="销售价">
          <Input v-model="item.parts.partsPrice" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="进货日期">
          <DatePicker type="date" placeholder="Select date" v-model="item.parts.date"></DatePicker>
        </FormItem>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import * as Handle_part from '@/network/parts'
  export default {
    data() {
      return {
        index: 1,
        formDynamic: {
          items: [
            {
              status: 1,
              index: 1,
              parts: {
                partsName: "",
                partsNumber: 0,
                partsPrice: 0.0,
                venderInfo: "",
                buyingPrice: 0.0,
                oprationLog: ""
              }
            }
          ]
        },
      }
    },
    methods: {
      handleSubmit() {
        let pts = [{
          partsName: "",
          partsNumber: 0,
          partsPrice: 0.0,
          venderInfo: "",
          buyingPrice: 0.0,
          oprationLog: ""
        }]
        for(let index in this.formDynamic.items){
          pts[index]=this.formDynamic.items[index].parts;
        }
        let parts = JSON.stringify(pts);
        Handle_part.addPartsData(pts).then(res => {
          alert('添加成功');
          this.$router.push('/warehouse');
          history.go(0);
        })
      },
      handleAdd() {
        this.index++;
        this.formDynamic.items.push({
          index: this.index,
          status: 1,
          parts: {
            partsName: "",
            partsNumber: 0,
            partsPrice: 0.0,
            venderInfo: "",
            buyingPrice: 0.0,
            oprationLog: ""
          }
        });
      },
      handleRemove(index) {
        this.formDynamic.items[index].status = 0;
        this.formDynamic.items.splice(index,1);
      }
    }
  }
</script>