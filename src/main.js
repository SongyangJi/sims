import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 ElementUI组件
import ElementUI from 'element-ui'
// 样式需要单独导入
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  console.log('路由守卫',to,from);

  const path = to.path;

  if(to.meta.requiredAuth){
    if(path.match('/home/*') && store.state.administrator.id  || path.match('/student-home/*') && store.getters.getStudentID){
      next();
    }else{
      // 在登录成功后自动路由到目标位置
      next({
        path:'login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next();
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
