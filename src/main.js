import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 ElementUI组件
import ElementUI from 'element-ui'
// 样式需要单独导入
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入异步传输
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
