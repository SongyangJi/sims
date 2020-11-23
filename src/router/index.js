import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import DisplayStudents from "../components/students/DisplayStudents";
import AddStudents from "../components/students/AddStudents";

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/home',
    name:'Home',
    component: Home,
    children :[
      {
        path: 'display-students',
        name: 'DisplayStudents',
        component:DisplayStudents
      },
      {
        path: 'add-students',
        name: 'AddStudents',
        component: AddStudents
      },
    ]
  },
  {
    path: '*',
    redirect:'/login'
  }

]

const router = new VueRouter({
  routes
})

export default router
