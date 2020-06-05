import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    children:[
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        name:'home',
        component:()=>import('../views/home.vue')
      },
      {
        path:'/order',
        name:'order',
        component:()=>import('../views/order.vue')
      },
      {
        path:'/me',
        name:'me',
        component:()=>import('../views/me.vue')
      },
      {
        path:'/address',
        name:'address',
        component:()=>import('../views/address.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/me.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // let token=localStorage.getItem('token')
  const isLogin = localStorage.ele_login ? true : false
  if (to.path == '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
