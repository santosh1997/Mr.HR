import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'
import finaltest from '@/components/Finaltest'
import test from '@/components/test'
import recruit from '@/components/recruit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/finaltest',
      name: 'finaltest',
      component: finaltest
    },
    {
      path: '/recruit',
      name: 'recruit',
      component: recruit
    }
  ]
})
