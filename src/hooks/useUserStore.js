import { useStore } from 'vuex';
import { computed } from 'vue';

export default function useUserStore() {
  const store = useStore();

  const updateUserInfo = data => {
    store.commit('updateUserInfo', data);
  };

  const logout = () => {
    store.commit('loginOut');
  };

  return {
    userInfo: store.state.userInfo,
    updateUserInfo,
    logout
  };
}
