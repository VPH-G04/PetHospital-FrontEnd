import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import store from '../store';
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    redirect: '/login'
  },
  { path: '/login', name: 'login', component: () => import('../views/entry/login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/entry/register.vue') },
  // custom
  {
    path: '/guided',
    name: 'guided',
    component: () => import('../views/custom/guided/index.vue'),
    meta: { access: 'admin' }
  },
  {
    path: '/skill-learn',
    name: 'skill',
    component: () => import('../views/custom/skillLearn/index.vue'),
    meta: { access: 'admin' }
  },
  {
    path: '/case-learn',
    name: 'caseLearn',
    component: () => import('../views/custom/caseLearn/index.vue'),
    meta: { access: 'admin' }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/custom/test/index.vue'),
    meta: { access: 'admin' }
  },

  // admin ===
  {
    path: '/case',
    name: 'case',
    component: () => import('../views/admin/case/index.vue'),
    meta: { access: 'admin' }
  },
  {
    path: '/case/details',
    name: 'caseDetail',
    component: () => import('../views/admin/case/detail.vue')
  },

  {
    path: '/question',
    name: 'question',
    component: () => import('../views/admin/question/index.vue')
  },
  {
    path: '/examination',
    name: 'examination',
    component: () => import('../views/admin/examination/index.vue')
  },
  {
    path: '/testPaper',
    name: 'testPaper',
    component: () => import('../views/admin/testPaper/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const isLogin = store.state.userInfo;
  // const isAdmin = to.meta.access === 'admin';

  if (!isLogin) {
    if (to.path !== '/login' && to.path !== '/register') return next('/login');
  }
  next();
});

export default router;
