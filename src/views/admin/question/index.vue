<template>

  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="3"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <div>
          <a-drawer
              title="题目详情"
              placement="right"
              :closable="false"
              :visible="visible"
              :get-container="false"
              width="30%"
              :wrap-style="{ position: 'absolute' }"
              @close="onClose"
          >
            <p>{{ question.title }}</p>
            <p>A. {{ question.a }}</p>
            <p>B. {{ question.b }}</p>
            <p>C. {{ question.c }}</p>
            <p>D. {{ question.d }}</p>
            <a-divider></a-divider>
            <p>答案：{{ question.answer }}</p>
          </a-drawer>

          <a-space :size="20">
            <a-button type="primary" @click="onAdd">增加试题</a-button>

            <a-input-search
                v-model:value="value"
                placeholder="搜索题目名称"
                enter-button
                @search="onSearch"
            />

            <a-select
                v-model:value="diseaseId"
                placeholder="请选择病种"
            >
              <a-select-option v-for="item in disease" :value="item.id" :name="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-space>
          <br><br>

          <a-table
              rowKey="id"
              :columns="columns"
              :data-source="questionList.list"
              :loading="loading"
              :pagination="false"
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
                <span class="text_overflow-hidden" style="cursor: pointer; width: 800px">{{ text }}</span>
              </a-popover>
            </template>
            <template #action="{ record,index }">
        <span>
<!--          <a-typography-link @click="showDrawer(index)">详情</a-typography-link>-->
          <!--          <a-divider type="vertical"/>-->
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
              :total="questionList.total"
              :show-total="total => `共 ${total} 条`"
              @showSizeChange="onPageChange"
              @change="onPageChange"
              style="text-align: center"
          /><br>
        </div>
      </div>
    </a-layout-content>
  </a-layout>


</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import AdminMenu from "@/components/Header/AdminMenu";

export default defineComponent({
  components: {AdminMenu},
  data() {
    return {
      columns: [
        {title: '#', width:'80px',dataIndex: 'index', slots: {customRender: 'index'}},
        {title: '题目ID', width:'100px', dataIndex: 'id'},
        {title: '题名', dataIndex: 'title', slots: {customRender: 'question'}},
        {
          title: '操作',
          dataIndex: 'action',
          width:'80px',
          slots: {customRender: 'action'},
        },
      ],
      questionList: {
        total: '1',
        list: [{
          "id": 1,
          "diseaseId": 1,
          "title": "考试一",
        }],
      },
      disease: [
        {id: 1, name: '内科'},
        {id: 2, name: '外科'}
      ],
      diseaseId: 1,
    }
  },
  watch: {
    diseaseId() {
      this.loading = true;
      this.getData();
    }
  },
  created() {
    this.getDiseaseList();
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post('/question/getQuestionList', this.pageParam, {
        params: {diseaseId: this.diseaseId
        }}).then(res => {
        this.questionList = res;
        this.loading = false;
      });
    },
    getDiseaseList() {
      this.$axios.post('/disease/getAll').then(res => {
        this.disease = res;
        this.diseaseId = this.disease[0].id;
      });
    },
    onPageChange() {
      this.loading = true;
      this.getData();
    },
    onAdd() {
      this.$router.push('/question/add');
    },
    onDelete(id) {
      this.$axios.post('/question/deleteQuestion', null , {params: {
          questionId: id
        }}).then(res => {
        message.success('删除成功!');
        this.getData();
      });
    },
    showDrawer(index) {
      this.question = this.questionList.list[index];
      this.visible = true;
    },
  },
  setup(props, ctx) {
    const loading = ref(true);
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    const visible = ref(false);
    let question = reactive({});
    const onClose = () => {
      visible.value = false;
    };
    return {
      pageParam,
      loading,
      visible,
      question,
      onClose,
    }
  }
});
</script>

<style lang="less" scoped></style>
