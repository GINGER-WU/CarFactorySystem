import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import moment from 'moment'
import cInfo from '@/views/carfiles/carfileInfo'
import mParts from '@/views/carfiles/modify/modifyFittings'
Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.prototype.$moment = moment;
Vue.component('cinfo',cInfo);
Vue.component('mparts',mParts);
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
