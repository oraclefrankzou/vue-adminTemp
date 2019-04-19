// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { Notification } from 'element-ui'

// 阿里图标
import './assets/iconfont/iconfont.css'

// 引入百度echarts
import echarts from 'echarts'

// 滑动验证框

import store from '@/store/index'

Vue.config.productionTip = false

Vue.use(ElementUI)

/**/

axios.interceptors.request.use(config => {
  /* 会话超时默认设置为3小时 */
  var timeOutSeconds = 10800
  try {
    var vals = localStorage.getItem('usernameAndTime')
    var dataObj = JSON.parse(vals)
    if ((new Date().getTime() - dataObj.activeTime) > timeOutSeconds * 1000) {
      Notification({title: '温馨提示', message: '会话已超时,请重新登录!', type: 'warning'})
      router.push({path: '/login'})
      return config
    }
    return config
  } catch (e) {
    return config
  }
}
)

/* 对每个response都要处理 */

axios.interceptors.response.use(data => {
  try {
    var vals = localStorage.getItem('usernameAndTime')
    var dataObj = JSON.parse(vals)
    var usernameAndTime = JSON.stringify({
      username: dataObj.username,
      activeTime: new Date().getTime()
    })
    localStorage.setItem('usernameAndTime', usernameAndTime)
    return data
  } catch (e) {
    return data
  }
}, error => {
  return Promise.reject(error)
})

/* 过滤用户状态 */
Vue.filter('is_locked', function (value) {
  if (value === 0) {
    return true
  } else {
    return false
  }
})

/* admin用户状态 */
Vue.filter('is_admin', function (value) {
  if (value === 'admin') {
    return true
  } else {
    return false
  }
})

/* 只截取字符串前10个字符 */
Vue.filter('10_substr', function (value) {
  if (value.length >= 60) {
    return value.substr(0, 60)
  } else {
    return value
  }
})

/* 返回"正常"*或"异常"提示 */
Vue.filter('is_normal', function (value) {
  if (value === 'normal') {
    return '正常'
  } else {
    return '异常'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
