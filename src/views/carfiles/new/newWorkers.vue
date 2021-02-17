<template>
  <div>
    <Row>
    <Col span="6">
      <Select v-model="submitList" filterable multiple>
          <Option v-for="item in workerList" :value="item.workerID" :key="item.workerName">{{ item.workerName }}</Option>
      </Select>
  </Col>
</Row>
      <Button type="primary" @click="handleSubmit">Submit</Button>
</div>
</template>
<script>
  import * as Handle_carfiles from '@/network/carfiles'

  export default {
    data() {
      return {
        submitList:[],
        workerList:[],
        carfileID:this.$route.query.carfileID
      }
    },
    methods: {
      handleSubmit() {
        let JSONids = JSON.stringify(this.submitList);
        JSONids = JSONids.substr(0,JSONids.length-1);
        JSONids = JSONids.substr(1,JSONids.length-1);
        Handle_carfiles.addWorkerData(JSONids,this.carfileID).then(()=>{
          this.$router.replace({
            path:'/cf_newfittings',
            query:{
              carfileID:this.carfileID
            }
          })
        })
        console.log(JSONids);
      },
    },
    created() {
      Handle_carfiles.getWorkerList(1,100).then((res)=>{
        this.$nextTick(() => {
        this.workerList = res.data.data.list;
        })
      })
      this.$Message["success"]({
        background: true,
        content: '操作成功'
      });
    },
  }
</script>