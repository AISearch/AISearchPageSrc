import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Intro from '@/components/intro'
import Algorithm from '@/components/Algorithm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/Algorithm/:AlgName',
      name: 'Algorithm',
      component: Algorithm
    }
  ],
})
