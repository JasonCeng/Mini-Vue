import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import content from '@/page/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      meta: {
        title: '首页'
      },
      component: index
    },
    {
      path: '/content/:id',
      name: '详情',
      meta: {
        title: '详情'
      },
      component: content
    }
  ]
})
