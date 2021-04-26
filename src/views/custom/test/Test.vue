<template>
  <a-layout style="min-height: 91%">
    <a-layout-content style="padding: 0 50px">
      <a-page-header
          style="padding: 20px 100px 0 60px"
          title="测试"
          :breadcrumb="{ routes }"
      >
        <template #extra>
          <a-input-search
              v-model:value="value"
              placeholder="搜索考试"
              enter-button
              @search="onSearch"
          />
        </template>
      </a-page-header>
      <a-spin :spinning="loading" tip="Loading...">
        <div style="padding: 20px 50px; min-height: 400px">
          <div style="min-height: 450px">
            <a-row>
              <a-card v-for="(item, i) in testList.list" hoverable="true"
                      style="width: 20%;min-width: 300px; margin: 10px; cursor: pointer; border: 1px solid #dbdbdb" @click="toDetail(item.id)">
                <div style="font-size: 20px">{{ item.name }}</div>
                <a-divider></a-divider>
                <div>开始时间：{{ item.start }}</div>
                <div>结束时间：{{ item.end }}</div>
              </a-card>
            </a-row>
          </div>

          <br>
          <a-pagination
              show-size-changer
              v-model:current="pageParam.pageNum"
              v-model:pageSize="pageParam.pageSize"
              :pageSizeOptions="['4','8','16','32']"
              :total="testList.total"
              :show-total="total => `共 ${total} 条`"
              @showSizeChange="onPageChange"
              @change="onPageChange"
              style="text-align: center"
          />
        </div>
      </a-spin>

    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import { useRouter } from "vue-router";
const routes = [
  {
    path: '/test',
    breadcrumbName: '测试',
  },
  {
    path: '/test',
    breadcrumbName: '所有测试',
  }
];
export default {
  name: "Test",
  data() {
    return {
      testList: {
        total: '1',
        list: [{
          "id": 1,
          "paperId": 1,
          "name": "考试一",
          "start": "2021-04-14 12:00:00",
          "end": "2021-04-14 16:00:00"
        }],
      },
    }
  },
  created() {
   this.getData();
  },
  methods: {
    getData(){
      this.$axios.post('/test/getTestList', this.pageParam).then(res => {
        this.testList = res;
        this.loading = false;
      });
    },
    onPageChange() {
      this.loading = true;
      this.getData();
    },
  },
  setup() {
    const loading = ref(true);
    let pageParam = reactive({
      pageNum: 1,
      pageSize: 8,
    });
    const router = useRouter();
    const toDetail = (id) => {
      router.push('/test/detail');
      Storage.setItem('testId', id);
    };
    return {
      routes,
      loading,
      pageParam,
      toDetail,
    }
  }
};
</script>

<style lang="less" scoped></style>
