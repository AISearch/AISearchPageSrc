import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Intro from '@/components/intro'
import Algorithm from '@/components/Algorithm'
import Papers from '@/components/Papers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Intro
    },
    {
      path: '/Algorithm/:AlgName',
      name: 'Algorithm',
      component: Algorithm
    },
    {
      path: '/Papers',
      name: 'Papers',
      component: Papers
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    console.log(to, from, savedPosition);
    return { x: 0, y: 0 }
  }
})
