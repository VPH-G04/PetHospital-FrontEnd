<template>
  <div class="p-container">
    <h2 class="text-center mb-24">详情</h2>
    <a-empty></a-empty>

    <!-- <pre>{{ JSON.stringify(query, null, 2) }}</pre> -->
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();

    return { query: route.query };
  }
});
</script>

<style lang="less" scoped></style>
