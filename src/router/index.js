import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Indexcarfiles = () => import('@/views/carfiles/indexCarfiles')
const Statistics = () => import('@/views/statistics/statistics')
const Indexwarehouse = () => import('@/views/warehouse/indexWarehouse')
const Newfittings = () => import('@/views/warehouse/newFittings')
const Indexworkers = () => import('@/views/workers/indexWorkers')
const Newworkers = () => import('@/views/workers/newWorkers')
const CF_newcar = () => import('@/views/carfiles/new/newCar')
const CF_newmember = () => import('@/views/carfiles/new/newMember')
const CF_newcarfiles = () => import('@/views/carfiles/new/newCarfiles')
const CF_newfittings = () => import('@/views/carfiles/new/newFittings')
const CF_newworkers = () => import('@/views/carfiles/new/newWorkers')
const CF_modifycarfiles = () => import('@/views/carfiles/modify/modifyCarfiles')
const CF_modifyfittings = () => import('@/views/carfiles/modify/modifyFittings')
const CF_modifyworkers = () => import('@/views/carfiles/modify/modifyWorkers')
const Indexmembers = () => import('@/views/members/indexMembers')



const routes = [
  {
    path:'',
    redirect: '/home',
  },
  {
    path:'/login',
    component: Login,
    name:'登陆'
  },
  {
    path:'/home',
    component: Home,
    name:'首页'
  },
  {
    path:'/statistics',
    component: Statistics,
    name:'利润统计'
  },
  {
    path:'/carfiles',
    component:Indexcarfiles,
    name:'汽车档案首页',
    children:[
      {
        path:'cf_modifycarfiles',
        component:CF_modifycarfiles,
        name:'修改汽车档案信息'
      },
      {
        path:'cf_modifyfittings',
        component:CF_modifyfittings,
        name:'修改使用配件情况'
      },
      {
        path:'cf_modifyworkers',
        component:CF_modifyworkers,
        name:'修改使用员工情况'
      }
    ]
  },
  {
    path:'/newcar',
    component:CF_newcar,
    name:'新建汽辆信息'
  },
  {
    path:'/newclient',
    component:CF_newmember,
    name:'新建联系人信息'
  },
  {
    path:'/newcarfile',
    component:CF_newcarfiles,
    name:'新建汽车档案信息'
  },
  {
    path:'/cf_newworkers',
    component:CF_newworkers,
    name:'新建使用员工信息'
  },
  {
    path:'/cf_newfittings',
    component:CF_newfittings,
    name:'新建使用配件信息'
  },
  {
    path:'/warehouse',
    component:Indexwarehouse,
    name:'配件仓库',
  },
  {
    path:'/newfittings',
    component:Newfittings,
    name:'配件进货'
  },
  {
    path:'/workers',
    component:Indexworkers,
    name:'员工管理',
  },
  {
    path:'/newworkers',
    component:Newworkers,
    name:'添加新员工'
  },
  {
    path:'/members',
    component:Indexmembers,
    name:'会员管理',
  }
]

const router = new VueRouter({
  routes,
  mode:"history",
})

// 部分代码省略
import ViewUI from 'view-design';

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
});



export default router
