<template>
  <div>
    <Form ref="formDynamic" :model="formDynamic" label-position='left' inline>
      <Button type="success" @click="handleAdd" icon="md-add">会员</Button>
      <Button type="primary" @click="handleSubmit('formDynamic')" style="margin-left: 8px">提交</Button>
      <Button @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
      <br>
      <br>
      <FormItem style="margin-left: 3%;" v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :label="'会员 ' + item.index"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
        <Button type="error" @click="handleRemove(index)" ghost>
          <Icon color="red" type="md-close" />去除</Button>
        <br>
        <Row>
          <Col span="6">
          <FormItem label="会员姓名">
            <Input v-model="item.name" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
          <Col span="3">
          <FormItem label="性别">
            <Select v-model="item.sex">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="会员联系电话">
            <Input v-model="item.phoneNumber" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="会员生日">
              <DatePicker type="date" placeholder="Select date" v-model="item.birthday"></DatePicker>
            </FormItem>
            </Col>
        </Row>
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
              sex: '',
              phoneNumber: '',
              birthday: '',
              status: 1,
              index: 1,
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