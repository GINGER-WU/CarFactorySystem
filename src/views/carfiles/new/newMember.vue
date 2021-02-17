<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <Row>
        <Col span="8">
        <FormItem label="联系人">
          <Input :disabled="flag" v-model="formItem.memberName" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="联系电话">
          <Input :disabled="flag" v-model="formItem.memberPhonenumber" placeholder="Enter something..."></Input>
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
        formItem: {
          memberName: '',
          memberPhonenumber: '',
        },
        flag:this.$route.query.flag === 'false' ? false : true,
        carfileID:this.$route.query.carfileID,
      }
    },
    created() {
      if(this.flag == true){
        Handle_carfiles.getOldClient(this.carfileID).then(res => {
          this.$nextTick(() => {
            this.formItem.memberName = res.data.data.memberName;
            this.formItem.memberPhonenumber = res.data.data.memberPhonenumber;
          })
        })
      }
      this.$Message["success"]({
        background: true,
        content: '操作成功'
      });
    },
    methods: {
      handleNext(){
        Handle_carfiles.addClientData(this.formItem,this.carfileID).then(()=>{
          this.$router.replace({
            path:'/newcarfile',
            query:{
              carfileID:this.carfileID
            }
          })
        })
      }
    },
  }
</script>