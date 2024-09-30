import { createRouter, createWebHistory } from 'vue-router';

import Home from '../src/views/home.vue';
import Perfil from '../src/views/perfil.vue';
import Login from '../src/views/login.vue';
import Cadastro from '../src/views/cadastro.vue';
import { useAuthStore } from './stores/authStore';
import Inicio from '../src/views/inicio.vue';
import Doacao from '../src/views/doacao.vue';
import Sobre from '../src/views/sobre.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/doacao',
    name: 'Doacao',
    component: Doacao
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
