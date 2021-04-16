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
      Storage.removeItem('userInfo');
      state.userInfo = null;
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
});
