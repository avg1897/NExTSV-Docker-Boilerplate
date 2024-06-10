import {createRouter, createWebHistory} from 'vue-router'
import type {RouterOptions} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter(<RouterOptions>{
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/users/:id/posts',
      name: 'user_post',
      component: () => import('../views/PostsView.vue')
    },
  ]
})

export default router
