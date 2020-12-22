<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <Row>
        <Col span="3">
          <FormItem label="档案ID">
            <Input :disabled="true" v-model="carfileID"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="车牌号码">
          <AutoComplete v-model="formItem.carNumber" :data="data" :filter-method="filterMethod" placeholder="input here"
            @on-select="changeData" @on-change="changeData1">
          </AutoComplete>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="品牌">
          <Input :disabled="flag0" v-model="formItem.carBrand" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="车系">
          <Input :disabled="flag1" v-model="formItem.carSerie" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="车型">
          <Input :disabled="flag2" v-model="formItem.carModel" placeholder="Enter something..."></Input>
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
        carfileID: 0,
        formItem: {
          carNumber: '',
          carBrand: '',
          carSerie: '',
          carModel: '',
        },
        flag: false,
        flag0: false,
        flag1: false,
        flag2: false,
        optionList: [],
      }
    },
    created() {
      Handle_carfiles.getCarNumber().then(res => {
        this.$nextTick(() => {
          this.optionList = res.data.data;
        })
      }).then(() => {
        Handle_carfiles.getMaxID().then(res => {
          this.$nextTick(() => {
            this.carfileID = res.data.data + 1;
          })
        })
      })
    },
    computed: {
      data() {
        let data = [];
        for (let item of this.optionList) {
          data.push(item.carNumber);
        }
        return data;
      }
    },
    methods: {
      filterMethod(value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      changeData(value) {
        this.flag = true;
        for (let item of this.optionList) {
          if (item.carNumber == value) {
            this.formItem.carBrand = item.carBrand;
            this.formItem.carSerie = item.carSerie;
            this.formItem.carModel = item.carModel;
            this.flag0 = true;
            this.flag1 = true;
            this.flag2 = true;
          }
        }
      },
      changeData1(value) {
        let options = [];
        for (let item of this.optionList) {
          options.push(item.carNumber);
        }
        let i = options.indexOf(value);
        if (i == -1) {
          this.flag0 = false;
          this.flag1 = false;
          this.flag2 = false;
          this.formItem.carBrand = '';
          this.formItem.carSerie = '';
          this.formItem.carModel = '';
        } else {
          this.flag0 = true;
          this.flag1 = true;
          this.flag2 = true;
        }
      },
      handleNext(){
        Handle_carfiles.addCarData(this.formItem,this.carfileID).then(()=>{
          this.$router.replace({
            path:'/newclient',
            query:{
              carfileID:this.carfileID,
              flag:this.flag,
            }
          })
        })
      }
    },
  }
</script>