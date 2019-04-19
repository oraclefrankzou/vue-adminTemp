import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    tabPanes: [],
    tablePanelActive: '',
    dialogPasswordVisible: false,
    dialogChangeOrAddUserVisible: false,
    mainText: true,
    user: ''
  },
  mutations: {

    display_mainText (state, data) {
      if (data === true) { this.state.mainText = true } else {
        this.state.mainText = false
      }
    },
    change_dialogChangeOrAddUserVisible (stat, data) {
      if (data[0] === true) { this.state.dialogChangeOrAddUserVisible = true } else {
        this.state.dialogChangeOrAddUserVisible = false
      }
      if (data.length > 1) { this.state.user = data[1] }
    },
    change_dialogPasswordVisible (state, data) {
      if (data === true) { this.state.dialogPasswordVisible = true } else {
        this.state.dialogPasswordVisible = false
      }
    },
    // 添加tabs
    add_tabs (state, data) {
      let count = 0
      if (this.state.tabPanes.length === 0) {
        this.state.tabPanes.push({title: data[0], menuCmd: data[1]})
        this.state.tablePanelActive = data[1]

        count++
      } else {
        for (let i = 0; i < this.state.tabPanes.length; i++) {
          if (this.state.tabPanes[i].title === data[0]) {
            count++
            this.state.tablePanelActive = this.state.tabPanes[i].menuCmd
          }
        }
      }
      if (count === 0) {
        this.state.tabPanes.push({title: data[0], menuCmd: data[1]})
        this.state.tablePanelActive = data[1]
      }
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0
      for (let option of state.options) {
        if (option.route === route) {
          break
        }
        index++
      }
      this.state.options.splice(index, 1)
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index
    },
    // 设置详情信息
    save_detail_info (state, info) {
      this.state.userInfo = info
    }
  },
  actions: {
    add_tabs (context) {
      context.commit('add_tabs')
    },
    change_dialogPasswordVisible (context) {
      context.commit('change_dialogPasswordVisible')
    },
    change_dialogChangeOrAddUserVisible  (context) {
      context.commit('change_dialogChangeOrAddUserVisible')
    },
    display_mainText (context) {
      context.commit('display_mainText')
    }
  }
})

export default store
