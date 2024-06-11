import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/user/Login.vue'
import Perfil from '../views/user/Perfil.vue'
import Horarios from '../views/Horarios.vue'
import Reserva from '../views/Reserva.vue'
import Dashboard from '../views/Dashboard.vue'
import Order from '../components/order.vue'
import menuDetail from '../components/menuDetail.vue'
import Comentar from '../views/Comentar.vue'
import EditarPerfil from '@/views/EditarPerfil.vue'
import foodDetail from '@/components/foodDetail.vue'
import avaliacaoDetail from '@/components/avaliacaoDetail.vue'
import Registar from '../views/user/Registar.vue'

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
      beforeEnter: (to, from, next) => {
        const isAuthenticated = sessionStorage.getItem('isAdmin'); 
        if (isAuthenticated) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
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
      path: '/order/:id',
      name: 'Order',
      component: Order
    },
    {
      path: '/comentar/:id',
      name: 'comentar',
      component: Comentar
    },
    {
      path: '/menuDetail/:id',
      name: 'menuDetail',
      component: menuDetail
    },
    {
      path: '/editarPerfil/:field',
      name: 'editarPerfil',
      component: EditarPerfil
    },
    {
      path: '/foodDetail/:id',
      name: 'foodDetail',
      component: foodDetail
    },
    {
      path: '/avaliacaoDetail/:id',
      name: 'avaliacaoDetail',
      component: avaliacaoDetail
    },
    {
      path: '/registar',
      name: 'registar',
      component: Registar
    }
    


    
  ]
})

export default router
