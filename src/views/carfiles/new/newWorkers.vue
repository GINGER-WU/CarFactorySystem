<template>
  <div>
  <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
    <FormItem v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :label="'员工 ' + item.index"
      :prop="'items.' + index + '.value'"
      :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
      <Row>
        <Col span="12" style="padding-right:10px">
        <Select v-model="item.value" filterable>
          <Option v-for="item1 in workerList" :value="item1.value" :key="item1.value">{{ item1.label }}</Option>
        </Select>
        </Col>
        <Col span="4" offset="1">
          <Button type="text" @click="handleRemove(index)"><Icon color="red" type="md-close" /></Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="12">
        <Button type="success" @click="handleAdd" icon="md-add">
          添加工作人员</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
      <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
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
              value: '',
              index: 1,
              status: 1
            }
          ]
        },
        workerList: [
          {
            value: '1',
            label: '李四'
          },
          {
            value: '2',
            label: '张三'
          },
          {
            value: '3',
            label: 'icy'
          },
          {
            value: '4',
            label: '臭噗'
          },
        ],
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