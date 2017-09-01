import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Index from '@/components/index'
import Article from '@/components/article'
import Archive from '@/components/archive'
import Login from '@/components/login'
import NotFound from '@/components/r_404'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/page/:page',
      name: 'Page',
      component: Index
    },
    {
      path: '/articles/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/archives',
      name: 'Archive',
      component: Archive
    },
    {
      path: '/archives/:s',
      name: 'Search',
      component: Archive
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y)
      }, 200)
    } else {
      return { x: 0, y: 0 }
    }
  }
})
