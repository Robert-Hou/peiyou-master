import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutHome from '../layout/home'

import Home from "../views/Home.vue"

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
        path: '2',
        name: "Home2",
        component: Home
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
