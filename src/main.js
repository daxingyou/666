import Vue from 'vue'
import App from './App'

// 路由模块
import router from './router'

// 过滤器
import './api/filters'

// vue函数
import { vuefun } from './api/vue-fun'

Vue.use(vuefun)

// 中央管理状态
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
 
})