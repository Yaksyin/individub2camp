import { createRouter, createWebHistory } from 'vue-router';
import Organizationlist from '@/views/Organization/Organizationslist.vue'
import Organizationregister from '@/views/Organization/Organizationregister.vue'
import Organizationedit from '@/views/Organization/Organizationedit.vue'
import HomeView from '../views/HomeView.vue';
import store from '../store/index'; // Import your Vuex store
import AboutView from '@/views/AboutView.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requireAuth: true,
    },
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => import('../views/ProfileView.vue'),
  //   meta: {
  //     requireAuth: true,
  //   },
  // },
  // {
  //   path: '/profile-edit/:id',
  //   name: 'ProfileEdit',
  //   component: ProfileEdit,
  //   props: true, // This allows the id parameter to be passed as a prop
  //   meta: {
  //     requireAuth: true,
  //   },
  // },
  {
    path: '/organizationslist',
    name: 'organizationlist',
    component: Organizationlist,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/organizationsregister/register',
    name: 'organizationregister',
    component: Organizationregister,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/organizationedit/edit/:id',
    name: 'organizationedit',
    component: Organizationedit,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'login' });
    } 
  }
   if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next({ path: '/home' });
    } 
  }
  next()
});

export default router;