<template>
  <div>
  <Form ref="formDynamic" :model="formDynamic" :label-width="120" inline>
      <Button type="success" @click="handleAdd" icon="md-add">配件</Button>
      <Button type="primary" @click="handleSubmit('formDynamic')" style="margin-left: 8px">提交</Button>
      <Button @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
        <br>
        <br>
    <FormItem v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :label="'配件 ' + item.index"
      :prop="'items.' + index + '.value'"
      :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
      <Button type="text" @click="handleRemove(index)"><Icon color="red" type="md-close" /></Button>
      <br>
          <FormItem label="配件名称">
            <Input v-model="item.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="进货厂家信息">
            <Input v-model="item.info" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="进货价">
            <Input v-model="item.cost" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="销售价">
            <Input v-model="item.price" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="进货日期">
              <DatePicker type="date" placeholder="Select date" v-model="item.date"></DatePicker>
          </FormItem>
          <FormItem label="进货量">
            <Input v-model="item.count" placeholder="Enter something..."></Input>
          </FormItem>
    </FormItem>
  </Form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        index: 1,
        formDynamic: {
          items: [
            {
              name: '',
              count: 0,
              info: '',
              cost:'',
              price:'',
              status:1,
              index:1,
              date:''
            }
          ]
        },
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleAdd() {
        this.index++;
        this.formDynamic.items.push({
          value: '',
          index: this.index,
          status: 1
        });
      },
      handleRemove(index) {
        this.formDynamic.items[index].status = 0;
      }
    }
  }
</script>