import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import posts from '../views/posts.vue'
import account from '../views/account.vue'
import myPosts from '../views/myPosts.vue'
import publish from '../views/publish.vue'

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
  {
    path: '/myposts/:token_user',
    name: 'myPosts',
    component: myPosts
  },
  {
    path: '/account/:token_user',
    name: 'account',
    component: account
  },
  {
    path: '/publish',
    name: 'publish',
    component: publish
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router