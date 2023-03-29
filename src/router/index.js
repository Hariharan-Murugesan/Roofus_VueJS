import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    name: '',
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../components/Login.vue"),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../components/Register.vue"),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../components/Home.vue"),
  },
  {
    path: '/home/propertyView/:id',
    name: 'propertyView',
    component: () => import("../components/ViewProperty.vue"),
  },
  {
    path: '/home/houseView/:id',
    name: 'houseView',
    component: () => import("../components/ViewHouse.vue"),
  },
  {
    path: '/house',
    name: 'house',
    component: () => import("../components/HouseList.vue"),
  },
  {
    path: '/property',
    name: 'property',
    component: () => import("../components/PropertyList.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
