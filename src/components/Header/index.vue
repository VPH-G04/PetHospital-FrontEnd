<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row justify="space-between">
        <a-col>
          <div class="logo" />
          <span class="title">虚拟宠物医院</span>
        </a-col>
        <a-col>
          <a-menu
            theme="dark"
            mode="horizontal"
            v-model:selectedKeys="menuKeys"
            @click="clickMenu"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item v-for="item of list" :key="item.link">{{ item.text }}</a-menu-item>

            <a-dropdown placement="bottomRight" style="margin-left: 15px" v-if="getUserInfo">
              <a class="ant-dropdown-link" @click.prevent>
                <a-avatar
                  size="small"
                  src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  class="antd-pro-global-header-index-avatar"
                />
                <span class="username">{{ getUserInfo.username }}</span>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="logout">
                    <LoginOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  LoginOutlined
} from '@ant-design/icons-vue';
import { defineComponent, onMounted, ref, reactive, computed, watchEffect } from 'vue';
import { useRouter, onBeforeRouteUpdate, useRoute } from 'vue-router';
import useUserStore from '@/hooks/useUserStore';
import { mapGetters, useStore } from 'vuex';

const adminList = [
  { link: '/case', text: '病例管理' },
  { link: '/question', text: '题库管理' },
  { link: '/testPaper', text: '试卷管理' },
  { link: '/examination', text: '考试管理' }
];

const customList = [
  { link: '/guided', text: '导览' },
  { link: '/skill-learn', text: '职能学习' },
  { link: '/case-learn', text: '病例学习' },
  { link: '/test', text: '测试' }
];

export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    LoginOutlined
  },

  computed: {
    getUserInfo() {
      return this.$store.state.userInfo;
    }
  },
  setup() {
    const route = useRoute();
    const menuKeys = ref([route.path]);
    const router = useRouter();
    const store = useStore();
    const { userInfo, logout } = useUserStore();

    router.afterEach((to, from) => {
      menuKeys.value = [to.path];
    });

    const list = computed(() => {
      let list = store.state.userInfo?.admin ? adminList : customList;
      if (!store.state.userInfo?.username) list = [];
      return list;
    });
    const getUserInfo = computed(() => {
      return store.state.userInfo;
    });
    return {
      getUserInfo,
      list,
      menuKeys,
      logout() {
        logout();
        router.push('/login');
      },
      clickMenu({ item, key, keyPath }) {
        router.push(key);
      }
    };
  }
});
</script>
<style lang="less" scoped>
@import 'index';
</style>
