import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import posts from '../views/posts.vue'
import account from '../views/account.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/posts',
    name: 'posts',
    component: posts
  },
  // {
  //   path: '/posts/:id',
  //   name: 'postsID',
  //   component: postsID
  // },
  {
    path: '/account/:id',
    name: 'account',
    component: account
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router