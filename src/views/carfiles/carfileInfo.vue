<template>
  <div>
    <Drawer :closable="false" width="640" v-model="flag">
      <p :style="pStyle">汽车档案详情</p>
      <p :style="pStyle">客户信息</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">
          姓名: Aresn
          </Col>
          <Col span="12">
          联系电话: 1382923451
          </Col>
        </Row>
      </div>
      <Divider />
      <p :style="pStyle">车辆信息</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">
          车牌号: Programmer
          </Col>
          <Col span="12">
          品牌:Coding
          </Col>
        </Row>
        <Row>
          <Col span="12">
          车系: Map visualization
          </Col>
          <Col span="12">
          车型: Map visualization
          </Col>
        </Row>
      </div>
      <Divider />
      <p :style="pStyle">车辆进厂信息</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">
          里程数: admin@aresn.com
          </Col>
          <Col span="12">
          进厂时间: +86 18888888888
          </Col>
        </Row>
        <Row>
          <Col span="12">
          工时项目: <a href="https://github.com/view-design/ViewUI"
            target="_blank">https://github.com/view-design/ViewUI</a>
          </Col>
          <Col span="12">
          工时费用: +86 18888888888
          </Col>
        </Row>
        <Row>
          <Col span="12">
          是否出厂: +86 18888888888
          </Col>
        </Row>
      </div>
      <Divider />
      <p :style="pStyle">使用工人情况</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">
          工人ID: admin@aresn.com
          </Col>
          <Col span="12">
          工人姓名: +86 18888888888
          </Col>
        </Row>
      </div>
      <Divider />
      <p :style="pStyle">使用配件情况</p>
      <div class="demo-drawer-profile">
        <table>
          <tr>
            <th>
              配件编号
            </th>
            <th>
              配件名称
            </th>
            <th>
              配件单价
            </th>
            <th>
              配件使用数量
            </th>
          </tr>
          <tr>
            <td>1</td>
            <td>机油格</td>
            <td>50.5</td>
            <td>2</td>
          </tr>
        </table>
      </div>
    </Drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        flag: true,
        pStyle: {
          fontSize: '16px',
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '24px',
          display: 'block',
          marginBottom: '16px'
        },
      }
    },
    props: {
      carInfo: {
        type: Object,
        default() {
          return {}
        },
      },
      useWorker: {
        type: Array,
        default() {
          return []
        },
      },
      useParts: {
        type: Array,
        default() {
          return []
        },
      }
    },
    created() {
      setTimeout(()=>{
      console.log(this.carInfo);
      },5000)
    },
  }
</script>