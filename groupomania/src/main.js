import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    component: require('./components/login.vue')
  }, {
    path: '*',
    redirect: '/'
  }]
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(require('./App.vue')),
}).$mount('#app')