import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router/index';
import store from './store';
import axios from './utils/axios';
import './app.less';

// require('./mock');

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(Antd);

app.config.globalProperties.$axios = axios;

router.isReady().then(() => app.mount('#app'));
