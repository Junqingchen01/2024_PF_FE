import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/user/Login.vue'
import perfil from '../views/user/Perfil.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('isLogin'); 
        if (isAuthenticated) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/reserva',
      name: 'reserva',
      component: () => import('../views/Reserva.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('isLogin'); 
        if (isAuthenticated) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/horarios',
      name: 'horarios',
      component: () => import('../views/Horarios.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: perfil
    },

    
  ]
})

export default router
