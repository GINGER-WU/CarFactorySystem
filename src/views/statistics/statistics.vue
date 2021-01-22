<template>
  <div>
    <div style="display:inline">
      <RadioGroup v-model="flag" type="button" size="large">
        <Radio label="按日查询"></Radio>
        <Radio label="按月查询"></Radio>
        <Radio label="按年查询"></Radio>
      </RadioGroup>
      <div style="padding-top: 10px;">
        <div v-show="flag=='按日查询'">
          <span style="padding-left: 10px;padding-right: 10px;">按日查询</span>
          <DatePicker v-model="pickdate" @on-change="handleDateChange" type="date" placeholder="Select date"
            style="width: 200px"></DatePicker>
        </div>
        <div v-show="flag=='按月查询'">
          <span style="padding-left: 10px;padding-right: 10px;">按月查询</span>
          <DatePicker v-model="pickmonth" @on-change="handleMonthChange" type="month" placeholder="Select date"
            style="width: 200px"></DatePicker>
        </div>
        <div v-show="flag=='按年查询'">
          <span style="padding-left: 10px;padding-right: 10px;">按年查询</span>
          <DatePicker v-model="pickyear" @on-change="handleYearChange" type="year" placeholder="Select date"
            style="width: 200px"></DatePicker>
        </div>
      </div>
    </div>
    <div style="display: inline-block;*display: inline;">
    <div id="main" style="margin: 0 auto;width: 1200px;height:600px;float: left;"></div>
    <Timeline style="float: left;">
      <TimelineItem>
          <p class="time">今日总利润</p>
          <p class="content">{{totalDay}}元</p>
      </TimelineItem>
      <TimelineItem>
          <p class="time">当月总利润</p>
          <p class="content">{{totalMonth}}元</p>
      </TimelineItem>
      <TimelineItem>
          <p class="time">今年总利润</p>
          <p class="content">{{totalYear}}元</p>
      </TimelineItem>
  </Timeline>
</div>
  </div>
</template>

<script>
  var myChart;
  import * as Handle_statistics from '@/network/statistics'
  export default {
    data() {
      return {
        myChart: '',
        pickdate: '',
        pickmonth: '',
        pickyear: '',
        flag: '按日查询',
        year: 0,
        month: 0,
        day: 0,
        xAxisdata: [],
        seriesdata: [],
        titleText: '',
        totalDay:0.0,
        totalMonth:0.0,
        totalYear:0.0
      };
    },
    created() {
      this.year = parseInt(this.$moment(new Date()).format("YYYY"));
      this.month = parseInt(this.$moment(new Date()).format("MM"));
      this.day = parseInt(this.$moment(new Date()).format("DD"));
      this.titleText = "当月利润";
      Promise.all([Handle_statistics.getStatisticsData(this.year, this.month),Handle_statistics.getStatisticsDataInfo(this.year, this.month, this.day)]).then(res=>{
        this.$nextTick(() => {
          res[0].data.data.forEach(element => {
            this.xAxisdata.push(element.day);
            this.seriesdata.push(element.profit);
          });
          this.totalDay = res[1].data.data[0];
          this.totalMonth = res[1].data.data[1];
          this.totalYear = res[1].data.data[2];
        })
      })
    },
    mounted() {
      this.InitChart();
    },
    methods: {
      handleDateChange() {
        let xAxisdata = [];
        let seriesdata = [];
        if (this.pickdate != "") {
          this.year = parseInt(this.$moment(this.pickdate).format("YYYY"));
          this.month = parseInt(this.$moment(this.pickdate).format("MM"));
          this.day = parseInt(this.$moment(this.pickdate).format("DD"));
          this.titleText = this.year + "-" + this.month + "-" + this.day + "利润";
          Handle_statistics.getStatisticsData(this.year, this.month, this.day).then(res => {
            this.$nextTick(() => {
              res.data.data.forEach(element => {
                xAxisdata.push("档案ID:"+element.carfileID);
                seriesdata.push(element.profit);
              });
              this.xAxisdata = xAxisdata;
              this.seriesdata = seriesdata;
            })
          })
          this.changeChart();
        }
      },
      handleMonthChange() {
        let xAxisdata = [];
        let seriesdata = [];
        if (this.pickmonth != "") {
          this.year = parseInt(this.$moment(this.pickmonth).format("YYYY"));
          this.month = parseInt(this.$moment(this.pickmonth).format("MM"));
          this.titleText = this.year + "-" + this.month + "利润";
          Handle_statistics.getStatisticsData(this.year, this.month).then(res => {
            this.$nextTick(() => {
              res.data.data.forEach(element => {
                xAxisdata.push(element.day);
                seriesdata.push(element.profit);
              });
              this.xAxisdata = xAxisdata;
              this.seriesdata = seriesdata;
            })
          })
          this.changeChart();
        }
      },
      handleYearChange() {
        let xAxisdata = [];
        let seriesdata = [];
        if (this.pickyear != "") {
          this.year = parseInt(this.$moment(this.pickyear).format("YYYY"));
          this.titleText = this.year + "利润";
          Handle_statistics.getStatisticsData(this.year).then(res => {
            this.$nextTick(() => {
              res.data.data.forEach(element => {
                xAxisdata.push(element.month);
                seriesdata.push(element.profit);
              });
              this.xAxisdata = xAxisdata;
              this.seriesdata = seriesdata;
            })
          })
          this.changeChart();
        }
      },
      changeChart() {
        document.getElementById('main').innerHTML = "";
        this.InitChart();
      },
      InitChart() {
        setTimeout(() => {
          document.getElementById("main").removeAttribute("_echarts_instance_");
          myChart = this.$echarts.init(document.getElementById('main'));
          // 指定图表的配置项和数据
          let option = {
            title: {
              text: this.titleText
            },
            tooltip: {},
            legend: {
              data: ['利润']
            },
            xAxis: {
              data: this.xAxisdata
            },
            yAxis: {
            },
            series: [{
              name: '利润',
              type: 'bar',
              data: this.seriesdata
            }, {
              name: '利润',
              color: '#8cd5c2', //改变折线点的颜色
              type: 'line',
              data: this.seriesdata
            }]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }, 600)
      }
    },
  }
</script>
<style scoped>

</style>