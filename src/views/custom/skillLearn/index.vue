<template>
  <div class="page" :style="'background-image:url('+img1+')'"
       style="background-size:100% 150%;background-attachment: fixed; opacity: 0.6;
       background-repeat: no-repeat;min-height: 91%">
  </div>
  <div class="p2-container" style="position: absolute; top: 50px; width: 100%">
    <a-row type="flex" justify="space-around" style="width: 90%;min-width: 900px; margin: auto">
      <div v-for="(item, index) of state.list" :key="index" style="margin: 100px 0">
        <router-link :to="{path: '/skill-learn/detail', query: {role: index}}">
          <img :src="item.logo"/>
          <h2 style="text-align: center;font-weight: bold; margin-top: -70px">{{ item.text }}</h2>
        </router-link>
      </div>
    </a-row>
  </div>

</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue';
const img1 = require('../../../assets/background4.png');
const s1 = require('../../../assets/s1.png');
const s2 = require('../../../assets/s2.png');
const s3 = require('../../../assets/s3.png');

export default defineComponent({
  setup() {
    const state = reactive({
      list: [
        { text: '前台', logo: s1 },
        { text: '医师', logo: s2 },
        { text: '医助', logo: s3 }
      ]
    });

    onMounted(async () => {});

    return { state,img1 };
  }
});
</script>

<style lang="less" scoped>
</style>
