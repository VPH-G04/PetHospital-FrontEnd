<template>
  <a-menu
      theme="dark"
      mode="inline"
      @click="clickMenu"
      v-model:selectedKeys="menuKeys"
  >
    <a-menu-item key="1">
      <UserOutlined />
      <span>用户管理</span>
    </a-menu-item>
    <a-menu-item key="0">
      <HomeOutlined />
      <span>科室管理</span>
    </a-menu-item>
    <a-menu-item key="2">
      <ProfileOutlined />
      <span>病例管理</span>
    </a-menu-item>
    <a-menu-item key="3">
      <ClusterOutlined />
      <span>题库管理</span>
    </a-menu-item>
    <a-menu-item key="4">
      <FileTextOutlined />
      <span>试卷管理</span>
    </a-menu-item>
    <a-menu-item key="5">
      <CreditCardOutlined />
      <span>考试管理</span>
    </a-menu-item>

  </a-menu>
</template>

<script>
import {message} from "ant-design-vue";
import {defineComponent, reactive, ref} from "vue";
import {
  ClusterOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  ProfileOutlined,
  UserOutlined,
  HomeOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "AdminMenu",
  components: {
    UserOutlined,
    ProfileOutlined,
    ClusterOutlined,
    FileTextOutlined,
    CreditCardOutlined,
    HomeOutlined

  },
  props: {
    initKey: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickMenu(key) {
      console.log(key);
      switch (key.key) {
        case '0':
          this.$router.push('/department');
          break;
        case '1':
          this.$router.push('/user');
          break;
        case '2':
          this.$router.push('/case');
          break;
        case '3':
          this.$router.push('/question');
          break;
        case '4':
          this.$router.push('/testPaper');
          break;
        case '5':
          this.$router.push('/examination');
          break;
      }
    },
  },
  setup(props) {
    const menuKeys = ref([props.initKey]);
    return {
      menuKeys,
    }
  }
});
</script>

<style scoped>

</style>