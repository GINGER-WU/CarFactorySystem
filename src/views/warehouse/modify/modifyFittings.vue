<template>
  <div>
    <Form :model="formItem" :label-width="120" label-position="right">
      <Row>
        <Col span="4">
        <FormItem label="配件名称">
          <Input v-model="formItem.name" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="4">
        <FormItem label="配件数量">
          <Input v-model="formItem.count" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="4">
        <FormItem label="进货厂家信息">
          <Input v-model="formItem.info" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="4">
        <FormItem label="进货价">
          <Input v-model="formItem.cost" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="4">
        <FormItem label="销售价">
          <Input v-model="formItem.price" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" to="/cf_newworkers">提交</Button>
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
          name: '',
          count: 0,
          info: '',
          cost: '',
          price: '',
        }
      }
    }
  }
</script>