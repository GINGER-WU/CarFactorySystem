<template>
  <div>
    <Form ref="formDynamic" :model="formDynamic" label-position='left' inline>
      <Button type="success" @click="handleAdd" icon="md-add">员工</Button>
      <Button type="primary" @click="handleSubmit('formDynamic')" style="margin-left: 8px">提交</Button>
      <Button @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
      <br>
      <br>
      <FormItem style="margin-left: 3%;" v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :label="'配件 ' + item.index"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
        <Button type="error" @click="handleRemove(index)" ghost>
          <Icon color="red" type="md-close" />去除</Button>
        <br>
        <Row>
          <Col span="3">
          <FormItem label="员工姓名">
            <Input v-model="item.worker.workerName" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
          <Col span="3">
          <FormItem label="员工性别">
            <Select v-model="item.worker.workerSex">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="员工联系电话">
            <Input v-model="item.worker.workerPhoneNumber" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="员工身份证号码">
            <Input v-model="item.worker.workerIdcarNumber" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="入职时间">
            <DatePicker type="date" placeholder="Select date" v-model="item.worker.firstworkTime"></DatePicker>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import * as Handle_worker from '@/network/worker'

  export default {
    data() {
      return {
        index: 1,
        formDynamic: {
          items: [
            {
              status: 1,
              index: 1,
              worker:{
                workerName: '',
                workerSex: '',
                workerPhoneNumber: '',
                workerIdcarNumber: '',
                firstworkTime: '',
              }
            }
          ]
        },
      }
    },
    methods: {
      handleSubmit(name) {
        let wks = [{
                workerName: '',
                workerSex: '',
                workerPhoneNumber: '',
                workerIdcarNumber: '',
                firstworkTime: '',
        }]
        for(let index in this.formDynamic.items){

          let date = this.$moment(this.formDynamic.items[index].worker.firstworkTime).format("YYYY-MM-DD");
          this.formDynamic.items[index].worker.firstworkTime = date;
          wks[index]=this.formDynamic.items[index].worker;
        }
         let workers = JSON.stringify(wks);
         Handle_worker.addWorkersData(wks).then(res => {
           alert('添加成功');
         })
      },
      handleAdd() {
        this.index++;
        this.formDynamic.items.push({
          index: this.index,
          status: 1,
          worker:{
                workerID: 0,
                workerName: '',
                workerSex: '',
                workerPhoneNumber: '',
                workerIdcarNumber: '',
                firstworkTime: '',
              }
        });
      },
      handleRemove(index) {
        this.formDynamic.items.splice(index,1);
        this.formDynamic.items[index].status = 0;
      }
    }
  }
</script>