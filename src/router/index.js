import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Search from '@/views/Search'
import Result from '@/views/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component:Login,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
