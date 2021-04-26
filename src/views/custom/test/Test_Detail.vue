<template>
  <a-layout style="min-height: 91%">
    <a-layout-content style="padding: 0 50px">
      <a-page-header
          style="padding: 20px 60px"
          :title="'详情 - '+test.name"
          :breadcrumb="{ routes }"
          @back="() => $router.go(-1)"
      />
      <a-spin :spinning="loading" tip="Loading...">
        <a-card style="min-width: 500px;width: 50%; margin: 20px auto 0; box-shadow: 2px 2px 5px #717171;">

          <h2 style="text-align: center">{{ test.name }}</h2>
          <a-divider></a-divider>

          <a-descriptions size="small" :column="2">
            <a-descriptions-item label="试卷名称">{{ test.paperName }}</a-descriptions-item>
            <a-descriptions-item label="考试时长">{{ test.duration }}分钟</a-descriptions-item>
            <a-descriptions-item label="题目数量">{{ test.questionNum }}</a-descriptions-item>
            <a-descriptions-item label="开始时间">{{ test.start }}</a-descriptions-item>
            <a-descriptions-item label="总分">{{ test.score }}</a-descriptions-item>
            <a-descriptions-item label="结束时间">{{ test.end }}</a-descriptions-item>
          </a-descriptions>


          <div v-if="test.marked">
            <a-divider>已完成</a-divider>
            <a-result
                style="padding: 10px 10px"
                status="success"
                :title="'得分：'+ test.userScore"
                :sub-title="'提交时间：'+ test.submitTime"
            ></a-result>
<!--            <a-descriptions size="small" :column="1">-->
<!--              <a-descriptions-item label="得分"><span style="color: #2176de;font-weight: bolder">{{ test.userScore }}</span></a-descriptions-item>-->
<!--              <a-descriptions-item label="提交时间">{{ test.submitTime }}</a-descriptions-item>-->
<!--            </a-descriptions>-->
<!--            <div style="text-align: center; margin-top: 20px">-->
<!--              <a-button type="primary" size="large" disabled>已完成</a-button>-->
<!--            </div>-->
          </div>

          <div v-else-if="Date.parse(test.end) <= new Date()">
            <div style="text-align: center; margin-top: 20px">
              <a-button type="primary" size="large" @click="toContent" disabled>已过期</a-button>
            </div>
          </div>
          <div v-else-if="Date.parse(test.start) > new Date()">
            <div style="text-align: center; margin-top: 20px">
              <a-button type="primary" size="large" @click="toContent" disabled>未开始</a-button>
            </div>
          </div>
          <div v-else>
            <div style="text-align: center; margin-top: 20px">
              <a-button type="primary" size="large" @click="toContent">开始答题</a-button>
            </div>
          </div>

        </a-card>
      </a-spin>


    </a-layout-content>
  </a-layout>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Test_Detail",
  data() {
    return {
      routes: [
        {
          path: '/test',
          breadcrumbName: '测试',
        },
        {
          path: '/test/detail',
          breadcrumbName: '测试详情',
        }
      ],
      test: {
        id: 1,
        name: '考试一',
        paperName: '',
        paperId: 1,
        start: '2021-04-14 12:00:00',
        end: '2021-04-14 14:00:00',
        duration: 120,
        score: 100,
        questionNum: 10,
        marked: false,
        userScore: 80,
        submitTime: '2021-04-14 13:40:50'
      }
    }
  },
  created() {
    const testId = Storage.getItem('testId');
    if(testId !== undefined) {
      this.getData(testId);
    }
  },
  methods: {
    getData(id) {
      this.$axios.post('/test/getTest', null, {params: {
        testId: id
        }}).then(res => {
        this.test = res;
        this.loading = false;
      });
    },
    toContent() {
      this.$router.push('/test/content');
      Storage.setItem('testContent', JSON.stringify(this.test));
    },
  },
  setup() {
    const loading = ref(true);
    return {
      loading
    }
  }
};
</script>

<style scoped>

</style>