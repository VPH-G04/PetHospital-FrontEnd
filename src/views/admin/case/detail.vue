<template>
  <div class="p-container">
    <h2 class="text-center mb-24">{{ state.name }}</h2>

    <div v-for="(item, index) of state.procedureVOS" :key="index">
      {{ item.describe }}
      <img v-for="(item, index) of item.images" :key="index" :src="item" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/utils/axios';

export default defineComponent({
  setup() {
    const state = reactive({ name: '', procedureVOS: [] });

    const route = useRoute();

    onMounted(async () => {
      const { data } = await axios.post(`/case/get?id=${route.query.id}`, { id: route.query.id });
      state.name = data.name;
      state.procedureVOS = data.procedureVOS;
    });

    return { query: route.query, state };
  }
});
</script>

<style lang="less" scoped></style>
