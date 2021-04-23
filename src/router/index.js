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
    name: 'Test',
    component: () => import('../views/custom/test/Test'),
    meta: { access: 'admin' }
  },
  {
    path: '/test/detail',
    name: 'Test_Detail',
    component: () => import('../views/custom/test/Test_Detail'),
  },
  {
    path: '/test/content',
    name: 'Test_Content',
    component: () => import('../views/custom/test/Test_Content'),
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
    path: '/question/add',
    name: 'questionAdd',
    component: () => import('../views/admin/question/add.vue')
  },
  {
    path: '/examination',
    name: 'examination',
    component: () => import('../views/admin/examination/index.vue')
  },
  {
    path: '/examination/detail',
    name: 'examinationDetail',
    component: () => import('../views/admin/examination/detail.vue')
  },
  {
    path: '/examination/add',
    name: 'examinationAdd',
    component: () => import('../views/admin/examination/add.vue')
  },
  {
    path: '/testPaper',
    name: 'testPaper',
    component: () => import('../views/admin/testPaper/index.vue')
  },
  {
    path: '/testPaper/detail',
    name: 'testPaperDetail',
    component: () => import('../views/admin/testPaper/detail.vue')
  },
  {
    path: '/testPaper/add',
    name: 'testPaperAdd',
    component: () => import('../views/admin/testPaper/add.vue')
  },
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
