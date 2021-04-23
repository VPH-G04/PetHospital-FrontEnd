<template>
  <div>
    <a-page-header
        style="padding: 20px 100px 0 60px"
        :breadcrumb="{ routes }">
    </a-page-header>
    <br><br>
    <a-row type="flex" justify="space-between">
      <a-col :span="5" style="margin-left: 50px">
        <a-spin :spinning="loading1" tip="Loading...">
          <a-card class="card-border" style="min-width: 200px">
            <h2>{{ test.name }}</h2>
            <a-divider></a-divider>
            <a-descriptions size="small" :column="1">
              <a-descriptions-item label="试卷名称">{{ test.paperName }}</a-descriptions-item>
              <a-descriptions-item label="题目数量">{{ test.questionNum }}</a-descriptions-item>
              <a-descriptions-item label="总分">{{ test.score }}</a-descriptions-item>
              <a-descriptions-item label="考试时长">{{ test.duration }}分钟</a-descriptions-item>
              <a-descriptions-item label="开始时间">{{ test.start }}</a-descriptions-item>
              <a-descriptions-item label="结束时间">{{ test.end }}</a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-spin>
      </a-col>
      <a-col :span="15" style="margin-left: 50px; margin-top: -40px">
        <h2>提交记录</h2>
        <a-table
            rowKey="id"
            :columns="columns"
            :data-source="testLog.list"
            :loading="loading2"
            style="width: 500px"
            :pagination="false"
        >
          <template #action="{ record }">
            <span>
              <a-popconfirm title="确定删除？" @confirm="onDelete(record.id)">
              <a href="#">删除</a>
              </a-popconfirm>
            </span>
          </template>

        </a-table>
        <br>
        <a-pagination
            show-size-changer
            v-model:current="pageParam.pageNum"
            v-model:pageSize="pageParam.pageSize"
            :pageSizeOptions="['10','20','50','100']"
            :total="testLog.total"
            :show-total="total => `共 ${total} 条`"
            @showSizeChange="onPageChange"
            @change="onPageChange"
        /><br>

      </a-col>
    </a-row>

  </div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
const routes = [
  {
    path: '/examination',
    breadcrumbName: '考试管理',
  },
  {
    path: '/examination/detail',
    breadcrumbName: '详情',
  }
];
export default defineComponent({
  data() {
    return {
      test: {
        id: 1,
        name: '考试一',
        paperName: '试卷一',
        paperId: 1,
        start: '2021-04-14 12:00:00',
        end: '2021-04-14 14:00:00',
        duration: 120,
        score: 100,
        questionNum: 10,
      },
      testLog: {
        total: 10,
        list: [{
          id: 1,
          testId: 1,
          userId: 1,
          score: 100,
          submitTime: '2021-04-14 13:40:50'
        }]
      },
      columns: [
        {title: 'ID', dataIndex: 'id'},
        {title: '用户ID', dataIndex: 'userId'},
        {title: '分数', dataIndex: 'score'},
        {title: '提交时间', dataIndex: 'submitTime'},
        {
          title: '操作',
          dataIndex: 'action',
          slots: {customRender: 'action'},
        },
      ],
    }
  },
  created() {
    this.getTestData(this.$route.query.id);
    this.getTestLog(this.$route.query.id);
  },
  methods: {
    getTestData(id) {
      this.$axios.post('/test/getTest', null, {params: {
          testId: id
        }}).then(res => {
        this.test = res;
        this.loading1 = false;
      });
    },
    getTestLog(id) {
      this.$axios.post('/test/getTestLogList', this.pageParam, {params: {
        testId: id
        }}).then(res => {
        this.testLog = res;
        this.loading2 = false;
      });
    },
    onPageChange() {
      this.loading2 = true;
      this.getTestLog(this.$route.query.id);
    },
    onDelete(id) {
      this.$axios.post('/test/deleteTestLog', null , {params: {
          id: id
        }}).then(res => {
        message.success('删除成功!');
        this.getTestLog(this.$route.query.id);
      });
    },
  },
  setup() {
    const loading1 = ref(true);
    const loading2 = ref(true);
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    return {
      loading1,
      loading2,
      pageParam,
      routes,
    };
  }
});
</script>

<style lang="less" scoped></style>
