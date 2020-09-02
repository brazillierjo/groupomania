import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import posts from '../views/posts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
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
  // {
  //   path: '/Profile/:id',
  //   name: 'Profile',
  //   component: Profile
  // }
]

const router = new VueRouter({
  routes
})

export default router