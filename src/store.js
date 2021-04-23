import { createStore, useStore } from 'vuex';
import Storage from './utils/storage';

export default createStore({
  state() {
    return {
      userInfo: Storage.getItem('userInfo')
    };
  },
  mutations: {
    updateUserInfo(state, data) {
      Storage.setItem('userInfo', data);
      state.userInfo = data;
    },
    loginOut(state) {
      state.userInfo = null;
      // Storage.removeItem('userInfo');
      Storage.clear();
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
});
