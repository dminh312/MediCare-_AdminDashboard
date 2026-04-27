import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Staff from '../views/Staff.vue';
import AddStaff from '../views/AddStaff.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import UserManagement from '../views/UserManagement.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

import LivechatSupport from '../views/LivechatSupport.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login, meta: { public: true } },
  { path: '/forgot-password', component: ForgotPassword, meta: { public: true } },
  { path: '/dashboard', component: Dashboard }, // All roles can access Dashboard
  { path: '/staff', component: Staff, meta: { roles: ['Admin', 'HR'] } },
  { path: '/staff/add', component: AddStaff, meta: { roles: ['Admin', 'HR'] } },
  { path: '/users', component: UserManagement, meta: { roles: ['Admin', 'HR'] } },
  { path: '/medicine/add', component: () => import('../views/AddMedicine.vue'), meta: { roles: ['Admin', 'Medicine management'] } },
  { path: '/chat', component: LivechatSupport, meta: { roles: ['Admin', 'Customer Service'] } },
  { path: '/settings', component: Settings, meta: { roles: ['Admin', 'HR', 'Medicine management', 'Customer Service'] } },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// Navigation guard to check for auth token and role
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('medicare_admin_token');
  const userStr = localStorage.getItem('medicare_admin_user');
  let userRole = null;
  
  if (userStr) {
      try {
          userRole = JSON.parse(userStr).role || 'Customer Service';
      } catch (e) {}
  }

  if (!to.meta.public && !token) {
    next('/login');
  } else if (to.path === '/login' && token) {
    next('/dashboard');
  } else {
    if (to.meta.roles && userRole) {
      const userRoleLower = userRole.toLowerCase();
      if (userRoleLower !== 'admin' && !to.meta.roles.some(r => r.toLowerCase() === userRoleLower)) {
        return next('/dashboard');
      }
    }
    next();
  }
});

export default router;
