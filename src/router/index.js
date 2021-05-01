import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'

import Admin from '@/views/Admin'
import LoginForm from '@/views/LoginForm'
import Payment from '@/views/Payment'

import RetailCRM from '@/views/RetailCRM'
import MyLandCRM from '@/views/MyLandCRM'
import Affscale from '@/views/Affscale'

import MyLandCRM_Offers from '@/views/tabs/MyLandCRM/Offers'
import MyLandCRM_Orders from '@/views/tabs/MyLandCRM/Orders'

import RetailCRM_Offers from '@/views/tabs/RetailCRM/Offers'
import RetailCRM_Orders from '@/views/tabs/RetailCRM/Orders'

import Affscale_Offers from '@/views/tabs/Affscale/Offers'
import Affscale_Orders from '@/views/tabs/Affscale/Orders'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
    meta: {
      middleware: [
        guest
      ]
    },
  },
  {
    path: '/',
    name: 'Admin',
    component: Admin,
    meta: {
      middleware: [
        auth
      ]
    },
    children: [
      {
        path: '/partners/my-land-crm',
        name: 'MyLandCRM',
        component: MyLandCRM,
        meta: {
          middleware: [
            auth
          ]
        },
        children:[
          {
            path: '/partners/my-land-crm/offers',
            name: 'MyLandCRM Offers',
            component: MyLandCRM_Offers,
            meta: {
              middleware: [
                auth
              ]
            },
          },
          {
            path: '/partners/my-land-crm/orders',
            name: 'MyLandCRM Orders',
            component: MyLandCRM_Orders,
            meta: {
              middleware: [
                auth
              ]
            },
          },
        ]
      },
      {
        path: '/partners/retail-crm',
        name: 'RetailCRM',
        component: RetailCRM,
        meta: {
          middleware: [
            auth
          ]
        },
        children:[
          {
            path: '/partners/retail-crm/offers',
            name: 'RetailCRM Offers',
            component: RetailCRM_Offers,
            meta: {
              middleware: [
                auth
              ]
            },
          },
          {
            path: '/partners/retail-crm/orders',
            name: 'RetailCRM Orders',
            component: RetailCRM_Orders,
            meta: {
              middleware: [
                auth
              ]
            },
          },
        ]
      },
      {
        path: '/partners/affscale',
        name: 'Affscale',
        component: Affscale,
        meta: {
          middleware: [
            auth
          ]
        },
        children:[
          {
            path: '/partners/affscale/offers',
            name: 'Affscale Offers',
            component: Affscale_Offers,
            meta: {
              middleware: [
                auth
              ]
            },
          },
          {
            path: '/partners/affscale/orders',
            name: 'Affscale Orders',
            component: Affscale_Orders,
            meta: {
              middleware: [
                auth
              ]
            },
          },
        ]
      },
      {
        path: '/payments',
        name: 'Payments',
        component: Payment,
        meta: {
          middleware: [
            auth
          ]
        },
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
