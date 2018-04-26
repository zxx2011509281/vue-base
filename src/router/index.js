import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import  hello from './hello/hello'
import  home from './home/home'


const router =  new Router({
  mode: 'hash',
  scrollBehavior(to,from,savePosition){
    if(savePosition){
      return savePosition
    }else{
      return { x:0,y:0 }
    }
  },
  routes: [].concat({ path: "*", redirect: '/home' },).concat(hello).concat(home)
})

export default router

