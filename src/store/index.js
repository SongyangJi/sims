import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*

 sessionStorage 只有关闭页面、退出浏览器才会清除
 localStorage 除非只有主动清除，否则不会清除

 */

export default new Vuex.Store({
  state: {
    administrator:{
      id: window.sessionStorage.getItem('admin' || '[]')==null ? null: JSON.parse(window.sessionStorage.getItem('admin' || '[]')).id
    },
    student:{
      id: window.sessionStorage.getItem('student' || '[]')==null ? null: JSON.parse(window.sessionStorage.getItem('student' || '[]')).id
    }
  },
  getters: {
    getStudentID: state => state.student.id,

  },
  mutations: {
    login(state,admin){
      state.administrator = admin;
      admin.pwd = '';
      window.sessionStorage.setItem('admin',JSON.stringify(admin));
    },
    student_login(state,student){
      state.student = student;
      student.pwd = '';
      window.sessionStorage.setItem('student',JSON.stringify(student));
    }
  },
  actions: {
  },
  modules: {
  }
})
