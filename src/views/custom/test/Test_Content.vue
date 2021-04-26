<template>
  <a-layout style="min-height: 91%">
    <a-layout-content style="padding: 0 50px">
      <a-page-header
          style="padding: 20px 60px 20px 60px"
          :title="test.name"
          @back="() => $router.go(-1)"
      >
        <template #extra>
          <a-space size="middle">


            <a-typography-title :level="4" type="danger" style="margin: auto">
              <ClockCircleOutlined/>
              &nbsp;
              <count-down :time="test.duration*60*1000" @finish="onFinish" @nextToEnd="onNextToEnd"></count-down>
            </a-typography-title>
            <a-button type="danger" @click="onSubmit">提前交卷</a-button>
          </a-space>

        </template>
        <a-descriptions size="small" :column="4">
          <a-descriptions-item label="试卷名称">{{ test.name }}</a-descriptions-item>
          <a-descriptions-item label="考试时长">{{ test.duration }}分钟</a-descriptions-item>
          <a-descriptions-item label="开始时间">{{ test.start }}</a-descriptions-item>
          <a-descriptions-item label="结束时间">{{ test.end }}</a-descriptions-item>
        </a-descriptions>
      </a-page-header>

      <a-spin :spinning="loading" tip="Loading...">
        <a-row type="flex" justify="space-around" style="min-width: 800px;margin: 20px 50px">
          <a-col flex="205px">
            <a-card title="答题卡" bodyStyle="padding: 10px" style="border: 1px solid #dbdbdb">
              <a-space direction="vertical">
                <a-space v-for="i in Math.ceil(state.total / 5)">
                  <div v-for="j in Math.min(state.total - (i - 1) * 5, 5)">
                    <a-button v-if="state.current === (i-1) * 5 + j" @click="toQuestion(i, j)"
                              style="height: 30px; width: 30px;padding: 0; text-align: center" type="primary">
                      {{ (i - 1) * 5 + j }}
                    </a-button>
                    <a-button v-else-if="state.answer[(i-1) * 5 + j - 1] === ''" @click="toQuestion(i, j)"
                              style="height: 30px; width: 30px;padding: 0; text-align: center" type="dashed">
                      {{ (i - 1) * 5 + j }}
                    </a-button>
                    <a-button v-else @click="toQuestion(i, j)"
                              style="height: 30px; width: 30px;padding: 0; text-align: center; border: 1px solid black">
                      {{ (i - 1) * 5 + j }}
                    </a-button>
                  </div>
                </a-space>
              </a-space>


            </a-card>
          </a-col>
          <a-col flex="auto" style="margin-left: 50px; min-width: 300px;">

            <a-card style="border: 1px solid #dbdbdb">
              <p>
                <QuestionCircleOutlined/>
                {{ state.current }}/{{ state.total }} [单选题]
              </p>
              <!--            <p>在 main() 方法中给出的字节数组，如果将其显示到控制台上，需要（ ）。</p>-->
              <p>{{ question[state.current - 1].title }}</p>
              <a-radio-group v-model:value="state.answer[state.current - 1]">
                <a-radio style="display: block; height: 30px; line-height: 30px" value="a">
                  {{ question[state.current - 1].a }}
                </a-radio>
                <a-radio style="display: block; height: 30px; line-height: 30px" value="b">
                  {{ question[state.current - 1].b }}
                </a-radio>
                <a-radio style="display: block; height: 30px; line-height: 30px" value="c">
                  {{ question[state.current - 1].c }}
                </a-radio>
                <a-radio style="display: block; height: 30px; line-height: 30px" value="d">
                  {{ question[state.current - 1].d }}
                </a-radio>
              </a-radio-group>

              <br><br>
              <div v-if="state.current === state.total" style="float: right">
                <a-button type="danger" @click="onSubmit">提前交卷</a-button>
                <a-button type="primary" disabled style="margin-left: 20px">下一题</a-button>
              </div>
              <a-button v-else type="primary" style="float: right" @click="toNextQuestion">下一题</a-button>

            </a-card>
          </a-col>
        </a-row>
      </a-spin>



    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, ref, reactive, onMounted, createVNode} from 'vue';
import {useRouter} from "vue-router";
import {ClockCircleOutlined, QuestionCircleOutlined,ExclamationCircleOutlined} from '@ant-design/icons-vue';
import CountDown from "@/components/test/CountDown";
import {message, Modal, notification} from "ant-design-vue";

export default defineComponent({
  name: "Test_Content",
  components: {
    CountDown,
    ClockCircleOutlined,
    QuestionCircleOutlined
  },
  data() {
    return {
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
        questionList: [{id: 2, diseaseId: 1, title: '123', a: 'a', b: 'b', c: 'c', d: 'd', answer: 'a'}]
      },
      answerSheet: {
        score: 0,
        testId: 1,
      }
    }
  },
  created() {
    const _test = JSON.parse(Storage.getItem('testContent'));
    if(_test !== undefined) {
      this.test = _test;
      this.question = _test.questionList;
      this.state.total = this.question.length;
      this.state.answer = [];
      for (let i = 0; i < this.state.total; i++) {
        this.state.answer.push('');
      }
      console.log(this.question);
    }
  },
  beforeRouteLeave(to, form, next) {
    Modal.confirm({
      title: '确认离开考试界面？',
      icon: createVNode(ExclamationCircleOutlined),
      content: '点击确认离开，做题进度将不被保留！',
      onOk() {
        next()
      },
      onCancel() {},
    });
  },
  methods: {
    mark(){
      let count = 0;
      for (let i = 0; i < this.question.length; i++) {
        if(this.question[i].answer === this.state.answer[i]) {
          count++;
        }
      }
      this.answerSheet.score = count / this.question.length * 100;
      this.answerSheet.testId = this.test.id;
    },
    submit() {
      this.mark();
      this.$axios.post('/test/doTest', this.answerSheet).then(res => {
        message.success('提交成功!');
        this.$router.go(-1);
      });
    },
    onSubmit() {
      const _this = this;
      Modal.confirm({
        title: '确认提前交卷？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '点击确认按钮将提前交卷，且仅有一次提交机会，无法再次返回答题界面！',
        onOk() {
          setTimeout(_this.submit, 500);
        },
        onCancel() {},
      });

    },
    onFinish() {
      this.submit();
    },
    onNextToEnd() {
      notification.warning({
        placement: 'topRight',
        top: '15px',
        message: '测试快要结束了，请抓紧时间完成!',
        duration: 6
      });
    }
  },
  setup() {
    const loading = ref(true);
    let state = reactive({
      current: 1,
      answer: [''],
      total: 10,
    })
    let question = [
      {id: 2, diseaseId: 1, title: '123', a: 'a', b: 'b', c: 'c', d: 'd', answer: 'a'},
      {id: 2, diseaseId: 1, title: '123', a: 'a', b: 'b', c: 'c', d: 'd', answer: 'a'},
    ];
    const toNextQuestion = () => {
      if (state.current < state.total) {
        state.current++;
        console.log("current:" + state.current);
      }
    };
    const toQuestion = (i, j) => {
      state.current = (i - 1) * 5 + j;
      console.log("current:" + state.current);
    };
    onMounted(async () => {
      loading.value = false;

    });
    return {
      state,
      question,
      loading,
      toNextQuestion,
      toQuestion,
    }
  },
});
</script>

<style scoped>

</style>