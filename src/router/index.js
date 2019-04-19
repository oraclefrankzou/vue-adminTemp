import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'

import Login from '@/components/Login'

import ReportQuery from '@/components/views/ReportQuery'

Vue.use(Router)

const router = new Router({
  routes: [

    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {path: 'reportQuery', component: ReportQuery}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})

export default router
