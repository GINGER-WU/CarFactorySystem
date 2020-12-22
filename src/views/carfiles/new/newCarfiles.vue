<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <Row>
        <Col span="8">
          <FormItem label="里程数">
            <Input v-model="formItem.carMileage" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
          <Col span="8">
        <FormItem label="工时项目">
          <Input v-model="formItem.laborWork" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="工时费">
          <Input v-model="formItem.laborCost" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="进厂时间">
            <DatePicker type="date" placeholder="Select date" v-model="date"></DatePicker>
          </FormItem>
          </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="handleNext">下一步</Button>
        <Button style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import * as Handle_carfiles from '@/network/carfiles'
  
  export default {
    data() {
      return {
        date:'',
        formItem: {
          carMileage: 0.0,
          laborWork: "",
          laborCost: 0.0,
          startService: ""
        },
        carfileID:this.$route.query.carfileID
      }
    },
    methods: {
      handleNext(){
        this.formItem.startService=this.$moment(this.date).format("YYYY-MM-DD");
        Handle_carfiles.addInfoData(this.formItem,this.carfileID).then(()=>{
          this.$router.replace({
            path:'/cf_newworkers',
            query:{
              carfileID:this.carfileID
            }
          })
        })
      }
    },
  }
</script>