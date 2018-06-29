import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import List from '@/components/List'
import TopUp from '@/components/TopUp'

var VueCookie = require('vue-cookie');

Vue.use(Router)

 const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/topup',
      name: 'Top-Up',
      component: TopUp
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path == '/login'){
    next()
  }else{
    if(VueCookie.get('test')){
      next()
    }else{
      router.push('/login')
    }
  }
})

export default router