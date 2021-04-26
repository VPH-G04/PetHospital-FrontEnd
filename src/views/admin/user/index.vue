<template>
  <a-layout style="height: 100%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="1"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
    </a-layout-content>
  </a-layout>
</template>

<script>
import AdminMenu from "@/components/Header/AdminMenu";
export default {
name: "index",
  components: {AdminMenu}
}
</script>

<style scoped>

</style>