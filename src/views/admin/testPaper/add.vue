<template>
  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="4"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <a-form
            ref="formRef"
            layout="vertical"
            :model="formState"
            :rules="rules"
            style="width: 400px; margin: 40px auto"
        >
          <h2 class="text-center" style="font-weight: bold;">新增试卷</h2><br>

          <a-form-item name="name" label="试卷名称">
            <a-input v-model:value="formState.name" placeholder="请输入试卷名称"></a-input>
          </a-form-item>
          <a-form-item name="score" label="总分">
            <a-input-number v-model:value="formState.score" :min="1" :max="1000"></a-input-number>
          </a-form-item>
          <a-form-item name="question" label="试题">

            <a-button type="primary" @click="showDrawer">添加试题</a-button>
            <a-table
                rowKey="id"
                :columns="columns"
                :data-source="formState.questions"
                style="width: 400px; margin-top: 5px"
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
                  <span class="text_overflow-hidden" style="cursor: pointer; width: 200px">{{ text }}</span>
                </a-popover>
              </template>


              <template #action="{ record, index }">
            <span @click="onDelete(index)" style="cursor:pointer;">
              <MinusCircleTwoTone twoToneColor="red"/>
            </span>
              </template>
            </a-table>
          </a-form-item>
          <a-button block type="primary" @click="onSubmit">提交</a-button><br><br>
          <a-button block @click="$router.go(-1)">取消</a-button><br><br>
        </a-form>
        <a-drawer
            title="题目列表"
            placement="right"
            :closable="false"
            :visible="visible"
            :get-container="false"
            width="700px"

            @close="onClose"
        >
          <a-table
              rowKey="id"
              :columns="columns"
              :data-source="questionList.list"
              :loading="loading"
              :pagination="false"
              style="margin: -10px 0 auto 0;width: 100%"
          >
            <template #title>
              <a-select
                  v-model:value="diseaseId"
                  placeholder="请选择病种">
                <a-select-option v-for="item in disease" :value="item.id" :name="item.name">{{
                    item.name
                  }}
                </a-select-option>
              </a-select>
            </template>

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
                <span class="text_overflow-hidden" style="cursor: pointer; width: 450px">{{ text }}</span>
              </a-popover>
            </template>

            <template #action="{ record,index }">
        <span @click="onAdd(index)" style="cursor:pointer;">
          <PlusCircleTwoTone/>
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
          />
          <br>

        </a-drawer>
      </div>
    </a-layout-content>
  </a-layout>



</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import useUserStore from "@/hooks/useUserStore";
import {useRouter} from "vue-router";
import axios from "@/utils/axios";
import {message} from "ant-design-vue";
import {MinusCircleTwoTone, PlusCircleTwoTone} from "@ant-design/icons-vue";
import AdminMenu from "@/components/Header/AdminMenu";

export default defineComponent({
  components: {
    AdminMenu,
    MinusCircleTwoTone,
    PlusCircleTwoTone
  },
  data() {
    return {
      columns: [
        {title: '#', dataIndex: 'index', width: '50px', slots: {customRender: 'index'}},
        {title: 'ID', dataIndex: 'id', width: '60px',},
        {title: '题名', dataIndex: 'title', width: '240px', slots: {customRender: 'question'}},
        {title: '', dataIndex: 'action', width: '50px', slots: {customRender: 'action'}},
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
  methods: {
    getData() {
      this.$axios.post('/question/getQuestionList', this.pageParam, {
        params: {
          diseaseId: this.diseaseId
        }
      }).then(res => {
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
    onDelete(index) {
      this.formState.questionList.splice(index, 1);
      this.formState.questions.splice(index, 1);
    },
    onAdd(index) {
      this.formState.questionList.push(this.questionList.list[index].id);
      this.formState.questions.push(this.questionList.list[index]);
    },
    showDrawer(index) {
      this.question = this.questionList.list[index];
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
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
  setup() {
    const router = useRouter();
    const formRef = ref();
    const formState = reactive({name: '', score: 100, questions: [], questionList: []});
    const rules = {
      name: [{required: true, message: '请输入试卷名称', trigger: 'change'}],
      question: [{
        required: true,
        validator: (rule, value, callback) => {
          if (formState.questionList.length === 0) {
            return Promise.reject('请添加试题');
          } else {
            return Promise.resolve();
          }
        },
        trigger: 'change'
      }],
      score: [{required: true, type: 'number', message: '请输入总分', trigger: 'change'}],
    };

    const onSubmit = () => {
      formRef.value
          .validate()
          .then(() => {
            axios.post('/paper/createPaper', formState).then(res => {
              message.success(`创建试卷成功！`);
              router.go(-1);
            });
          })
          .catch(error => {
            console.log('error', error);
          });
    };
    const loading = ref(true);
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    const visible = ref(false);
    return {
      router,
      formRef,
      rules,
      formState,
      pageParam,
      loading,
      visible,
      onSubmit,
    };
  }
});
</script>

<style scoped>

</style>