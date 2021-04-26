<template>
  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="3"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <a-form
            ref="formRef"
            :label-col="{span: 4}" :wrapper-col="{span: 20}"
            :model="formState"
            :rules="rules"
            style="width: 350px; margin: 40px auto 0"
        >
          <h1 class="text-center" style="font-weight: bold">新增试题</h1><br>

          <a-form-item name="disease" label="病种">
            <a-select
                v-model:value="formState.diseaseId"
                placeholder="请选择病种"
            >
              <a-select-option v-for="item in disease" :value="item.id" :name="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="title" label="题干">
            <a-textarea v-model:value="formState.title" placeholder="请输入题干" :auto-size="{ minRows: 2, maxRows: 5 }"></a-textarea>
          </a-form-item>
          <a-form-item name="a" label="选项A">
            <a-textarea v-model:value="formState.a" placeholder="请输入选项A" auto-size></a-textarea>
          </a-form-item>
          <a-form-item name="b" label="选项B">
            <a-textarea v-model:value="formState.b" placeholder="请输入选项B" auto-size></a-textarea>
          </a-form-item>
          <a-form-item name="c" label="选项C">
            <a-textarea v-model:value="formState.c" placeholder="请输入选项C" auto-size></a-textarea>
          </a-form-item>
          <a-form-item name="d" label="选项D">
            <a-textarea v-model:value="formState.d" placeholder="请输入选项D" auto-size></a-textarea>
          </a-form-item>
          <a-form-item name="answer" label="答案">
            <a-radio-group v-model:value="formState.answer">
              <a-radio value="a">A</a-radio>
              <a-radio value="b">B</a-radio>
              <a-radio value="c">C</a-radio>
              <a-radio value="d">D</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-button block type="primary" @click="onSubmit">提交</a-button><br><br>
          <a-button block @click="$router.go(-1)">取消</a-button><br><br>
        </a-form>
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
import AdminMenu from "@/components/Header/AdminMenu";

export default defineComponent({
  components: {AdminMenu},
  data() {
    return {
      disease: [
        {id: 1, name: '内科'},
        {id: 2, name: '外科'}
      ],
    }
  },
  methods: {
    getDiseaseList() {
      this.$axios.post('/disease/getAll').then(res => {
        this.disease = res;
      });
    },
  },
  created() {
    this.getDiseaseList();
  },
  setup() {
    const router = useRouter();
    const formRef = ref();
    const formState = reactive({ name: '', diseaseId: '', a: '',b: '',c: '',d: '', answer: ''});
    const rules = {
      title: [{ required: true, message: '请输入题干', trigger: 'change' }],
      a: [{ required: true, message: '请输入选项A', trigger: 'change' }],
      b: [{ required: true, message: '请输入选项B', trigger: 'change' }],
      c: [{ required: true, message: '请输入选项C', trigger: 'change' }],
      d: [{ required: true, message: '请输入选项D', trigger: 'change' }],
      disease: [{ required: true,
        validator: (rule, value, callback) => {
          if (formState.diseaseId === '') {
            return Promise.reject('请选择病种');
          } else {
            return Promise.resolve();
          }
        },
       trigger: 'change' }],
      answer: [{ required: true,
        validator: (rule, value, callback) => {
          if (formState.answer === '') {
            return Promise.reject('请选择答案');
          } else {
            return Promise.resolve();
          }
        },
        trigger: 'change' }],
    };

    const onSubmit = () => {
      formRef.value
          .validate()
          .then(() => {
            axios.post('/question/createQuestion', formState).then(res => {
              message.success(`创建试题成功！`);
              router.go(-1);
            });
          })
          .catch(error => {
            console.log('error', error);
          });
    };
    const filterOption = (input, option) => {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      router,
      formRef,
      rules,
      formState,
      onSubmit,
      filterOption
    };
  }
});
</script>

<style scoped>

</style>