import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from 'firebase';

import Home from '../views/Home.vue';
import Signup from '@/components/auth/Signup';
import Login from '@/components/auth/Login';
import ViewProfile from '@/components/profile/ViewProfile';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile/:id',
    name: 'ViewProfile',
    component: ViewProfile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = auth().currentUser;
    if (user) {
      // if user signed in, proceed
      next();
    } else {
      // no suer signed in, redirect to login
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
