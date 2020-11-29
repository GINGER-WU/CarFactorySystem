import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Indexcarfiles = () => import('@/views/carfiles/indexCarfiles')
const Newcarfiles = () => import('@/views/carfiles/newCarfiles')
const Statistics = () => import('@/views/statistics/statistics')
const Indexwarehouse = () => import('@/views/warehouse/indexWarehouse')
const Newfittings = () => import('@/views/warehouse/newFittings')
const Indexworkers = () => import('@/views/workers/indexWorkers')
const Newworkers = () => import('@/views/workers/newWorkers')


const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/statistics',
    component: Statistics
  },
  {
    path:'/carfiles',
    component:Indexcarfiles,
  },
  {
    path:'/newcarfile',
    component:Newcarfiles
  },
  {
    path:'/warehouse',
    component:Indexwarehouse,
  },
  {
    path:'/newfittings',
    component:Newfittings
  },
  {
    path:'/workers',
    component:Indexworkers,
  },
  {
    path:'/newworkers',
    component:Newworkers
  },
]

const router = new VueRouter({
  routes,
  mode:"history",
})

export default router
