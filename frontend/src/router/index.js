import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Staff from '../views/Staff.vue';
import AddStaff from '../views/AddStaff.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login, meta: { public: true } },
  { path: '/forgot-password', component: ForgotPassword, meta: { public: true } },
  { path: '/dashboard', component: Dashboard },
  { path: '/staff', component: Staff },
  { path: '/staff/add', component: AddStaff },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// Navigation guard to check for auth token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('medicare_admin_token');
  if (!to.meta.public && !token) {
    next('/login');
  } else if (to.path === '/login' && token) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
