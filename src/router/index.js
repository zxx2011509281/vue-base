import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import  home from './home/home'
import  login from './login/login'


const router =  new Router({
  mode: 'hash',
  scrollBehavior(to,from,savePosition){
    if(savePosition){
      return savePosition
    }else{
      return { x:0,y:0 }
    }
  },
  routes: [].concat({ path: "*", redirect: '/login' },).concat(home).concat(login)
})

export default router

