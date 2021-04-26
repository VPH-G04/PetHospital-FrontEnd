<template>
  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="4"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <a-page-header
            :breadcrumb="{ routes }">
        </a-page-header>
        <br>
        <a-row type="flex" justify="space-between" style="min-width: 800px">
          <a-col :span="7" >
            <a-spin :spinning="loading" tip="Loading...">
              <a-card class="card-border" style="min-width: 250px">
                <h2>{{ paper.name }}</h2>
                <a-divider></a-divider>
                <a-descriptions size="small" :column="1">
                  <a-descriptions-item label="试卷ID">{{ paper.id }}</a-descriptions-item>
                  <a-descriptions-item label="试卷名称">{{ paper.name }}</a-descriptions-item>
                  <a-descriptions-item label="总分">{{ paper.score }}</a-descriptions-item>
                </a-descriptions>
              </a-card>
            </a-spin>
          </a-col>
          <a-col :span="15" style="margin-top: -60px">
            <h2>题目列表</h2><br>
            <a-table
                rowKey="id"
                :columns="columns"
                :data-source="paper.questionList"
                :loading="loading"

                :pagination="false"
                :scroll="{x:700,y:450}"
            >
              <template #index="{ index }">
                {{ parseInt(index) + 1 }}
              </template>

              <template #question="{ text, record, index }">
                <a-popover :title="text" overlayClassName="pop-card">
                  <template #content>
                    <span>A. {{ record.a }}</span><br>
                    <span>B. {{ record.b }}</span><br>
                    <span>C. {{ record.c }}</span><br>
                    <span>D. {{ record.d }}</span><br><br>
                    <span>答案：{{ record.answer }}</span>
                  </template>
                  <span class="text_overflow-hidden" style="cursor: pointer; width: 400px">{{ text }}</span>
                </a-popover>
              </template>

              <!--          <template #action="{ record }">-->
              <!--            <span>-->
              <!--              <a-popconfirm title="确定删除？" @confirm="onDelete(record.id)">-->
              <!--              <a href="#">删除</a>-->
              <!--              </a-popconfirm>-->
              <!--            </span>-->
              <!--          </template>-->

            </a-table>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import AdminMenu from "@/components/Header/AdminMenu";

const routes = [
  {
    path: '/testPaper',
    breadcrumbName: '试卷管理',
  },
  {
    path: '/testPaper/detail',
    breadcrumbName: '详情',
  }
];
export default defineComponent({
  components: {AdminMenu},
  data() {
    return {
      paper: {
        id: 1,
        name: '考试一',
        score: 100,
        questionList: [{id: 1,title: '',a:'',b:'',c:'',d:''}],
      },
      columns: [
        {title: '#', width: '50px',dataIndex: 'index', slots: {customRender: 'index'}},
        {title: '题目ID', width: '80px',dataIndex: 'id'},
        {title: '病种ID', width: '100px',dataIndex: 'diseaseId'},
        {title: '题名', dataIndex: 'title', slots: {customRender: 'question'}},
        // {title: '操作', dataIndex: 'action', slots: {customRender: 'action'}},
      ],
    }
  },
  created() {
    this.getPaperData(this.$route.query.id);
  },
  methods: {
    getPaperData(id) {
      this.$axios.post('/paper/getPaper', null, {
        params: {
          paperId: id
        }
      }).then(res => {
        this.paper = res;
        this.loading = false;
        console.log(this.paper.questionList)
      });
    },
    // onDelete(id) {
    //   this.$axios.post('/paper/deletePaper', null, {params: {
    //       id: id
    //     }}).then(res => {
    //     message.success('删除成功!');
    //     this.getPaperData(this.$route.query.id);
    //   });
    // },
  },
  setup() {
    const loading = ref(true);
    return {
      loading,
      routes,
    };
  }
});
</script>

<style lang="less" scoped></style>
