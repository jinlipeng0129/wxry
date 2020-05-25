import Vue from 'vue'
import VueRouter from 'vue-router'
import  Home from '../views/Home'
import  Main from '../views/Main'
import  Articles from '../views/Articles'
import  Heroes from '../views/Heroes'
Vue.use(VueRouter)
const routes = [
  {
      path:'/',
    name: 'Main',
    component:Main,
     children : [{path:'/',name:'Home',component:Home}, {path:'/articles/:id',name:'Articles',component:Articles,props:true}]

  },
    {path:'/heroes/:id',name:'Heroes',component:Heroes,props:true}
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
})

export default router
