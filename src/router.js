import Vue from 'vue'
import Router from 'vue-router'
import FullMap from './views/FullMap.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: FullMap
    },
    {
      path: '/activities',
      name: 'activities',
      component: FullMap
    },
    {
      path: '/hotels',
      name: 'hotels',
      component: FullMap
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: FullMap
    },
    {
      path: '/services',
      name: 'services',
      component: FullMap
    }
  ]
})
