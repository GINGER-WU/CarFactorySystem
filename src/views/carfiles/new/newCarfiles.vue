<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <Row>
        <Col span="8">
        <FormItem label="车牌号码">
          <Input v-model="formItem.carNo" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="联系人">
          <Input v-model="formItem.name" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="联系电话">
          <Input v-model="formItem.phoneNumber" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="进厂时间">
          <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
          -
          <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
        </FormItem>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="品牌">
          <Input v-model="formItem.carBrand" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="车系">
          <Input v-model="formItem.carSerie" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="车型">
          <Input v-model="formItem.carModel" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="5">
        <FormItem label="里程数">
          <Input v-model="formItem.miles" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="10">
        <FormItem label="工时项目">
          <Input v-model="formItem.laborWork" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="工时费">
            <Input v-model="formItem.laborCost" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
      </Row>
      <FormItem>
        <Button type="primary" to="/cf_newworkers">下一步</Button>
        <Button style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formItem: {
          carNo: '',
          name: '',
          phoneNumber: '',
          carBrand: '',
          carSerie: '',
          carModel: '',
          miles: '',
          date: '',
          time: '',
          laborWork:'',
          laborCost:'',
        }
      }
    }
  }
</script>