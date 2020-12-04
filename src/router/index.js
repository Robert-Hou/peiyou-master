import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutHome from '../layout/home'

import Home from "../views/Home.vue"
import HomeWork from "../views/HomeWork.vue"
import ErrorBook from "../views/ErrorBook.vue"
import ReportCenter from "../views/ReportCenter.vue"
import FinishedCourses from "../views/FinishedCourses.vue"
import CourseShop from "../views/CourseShop.vue"

import Course from "../views/Course.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: LayoutHome,
    children: [
      {
        path: '',
        name: "Home",
        component: Home
      },
      {
        path: 'HomeWork',
        name: "HomeWork",
        component: HomeWork
      },
      {
        path: 'ErrorBook',
        name: "ErrorBook",
        component: ErrorBook
      },
      {
        path: 'ReportCenter',
        name: "ReportCenter",
        component: ReportCenter
      },
      {
        path: 'FinishedCourses',
        name: "FinishedCourses",
        component: FinishedCourses
      },
      {
        path: 'CourseShop',
        name: "CourseShop",
        component: CourseShop
      },
    ]
  },
  {
    path: "/course/:id",
    name: "Course",
    component: Course
  },
  { path: '*', redirect: '/', hidden: true }
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
