import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import DisplayStudent from "../views/DisplayStudent";
import AddStudents from "../views/AddStudents";
import DisplayCourses from "../components/course/DisplayCourses";
import AddCourses from "../components/course/AddCourses";
import AddAchievement from "../components/achievement/AddAchievement";
import DisplayAchievement from "../components/achievement/DisplayAchievement";
import UpLoadImages from "../components/UpLoadImages";

import AddScore from "../views/AddScore";
import DisplayScore from "../views/DisplayScore";

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/upload',
    name: 'UpLoadSingleImage',
    component: UpLoadImages
  },
  {
    path: '/home',
    name:'Home',
    component: Home,
    children :[
      {
        path: 'display-students',
        name: 'DisplayStudent',
        component:DisplayStudent
      },
      {
        path: 'add-students',
        name: 'AddStudents',
        component: AddStudents
      },
      {
        path: 'display-courses',
        name: 'DisplayCourses',
        component: DisplayCourses
      },
      {
        path: 'add-courses',
        name: 'AddCourses',
        component: AddCourses
      },
      {
        path: 'add-achievement',
        name: 'AddAchievement',
        component: AddAchievement
      },
      {
        path: 'display-achievement',
        name: 'DisplayAchievement',
        component: DisplayAchievement
      },
      {
        path: 'add-score',
        name: 'AddScore',
        component: AddScore
      },
      {
        path: 'display-score',
        name: 'DisplayScore',
        component: DisplayScore
      }
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
