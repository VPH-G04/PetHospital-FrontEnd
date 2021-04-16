<template>
  <a-config-provider :locale="locale">
    <Header />
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import Header from './components/Header';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return { locale: zhCN };
  }
};
</script>

<style lang="less" scoped></style>
