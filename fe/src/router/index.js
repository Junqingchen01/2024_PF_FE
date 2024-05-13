import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/user/Login.vue'
import Perfil from '../views/user/Perfil.vue'
import Horarios from '../views/Horarios.vue'
import Reserva from '../views/Reserva.vue'
import Dashboard from '../views/Dashboard.vue'
import Orders from '../views/Orders.vue'
import Order from '../components/order.vue'
import Comentar from '../views/Comentar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = sessionStorage.getItem('isLogin'); 
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
      component: Reserva,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = sessionStorage.getItem('isLogin'); 
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
      component: Horarios,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil
    },
    {
      path: '/order/:id',
      name: 'Order',
      component: Order
    },
    {
      path: '/comentar/:id',
      name: 'comentar',
      component: Comentar
    }

    
  ]
})

export default router
