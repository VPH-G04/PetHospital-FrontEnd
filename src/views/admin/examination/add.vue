<template>
  <a-form
      ref="formRef"
      layout="vertical"
      :model="formState"
      :rules="rules"
      style="width: 350px; margin: 80px auto 0"
  >
    <h2 class="text-center">新增考试</h2><br>
    <a-form-item name="name" label="考试名称">
      <a-input v-model:value="formState.name" placeholder="请输入考试名称"></a-input>
    </a-form-item>
    <a-form-item name="paper" label="试卷">
      <a-select
          v-model:value="formState.paperId"
          show-search
          placeholder="请选择试卷"
          :filter-option="filterOption"
      >
        <a-select-option v-for="item in paperList" :value="item.id" :name="item.name">{{ '#' + item.id + ' ' + item.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item name="time" label="考试时间">
      <a-range-picker
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @change="onDateChange"/>
      </a-form-item>


    <a-form-item name="duration" label="考试时长">
      <a-input-number v-model:value="formState.duration" :min="1" :max="1440"></a-input-number> 分钟
    </a-form-item>
    <a-form-item>
      <a-button block type="primary" @click="onSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import useUserStore from "@/hooks/useUserStore";
import {useRouter} from "vue-router";
import axios from "@/utils/axios";
import {message} from "ant-design-vue";

export default defineComponent({

  data() {
    return {
      paperList: [
          {"id": 1, "name": "试卷一"},
      ],
    }
  },
  methods: {
    onDateChange(dates, dateStrings) {
      this.formState.startTime = dateStrings[0];
      this.formState.endTime = dateStrings[1];
    },
    getData() {
      this.$axios.post('/paper/getAllPaper').then(res => {
        this.paperList = res;
        this.loading = false;
      });
    },
  },
  created() {
    this.getData();
  },
  setup() {
    const router = useRouter();

    const formRef = ref();
    const formState = reactive({ name: '', paperId: '', startTime: '',endTime: '',duration: ''});
    const rules = {
      name: [{ required: true, message: '请输入考试名称', trigger: 'change' }],
      paper: [{ required: true,
        validator: (rule, value, callback) => {
          if (formState.paperId === '') {
            return Promise.reject('请选择试卷');
          } else {
            return Promise.resolve();
          }
        },
        message: '请选择试卷', trigger: 'change' }],
      time: [{ required: true,
        validator: (rule, value, callback) => {
          if (formState.startTime === '') {
            return Promise.reject('请选择考试时间');
          } else {
            return Promise.resolve();
          }
        },
        message: '请选择考试时间', trigger: 'change'
      }],
      duration: [{ required: true, type: 'number', message: '请输入考试时长', trigger: 'change' }],
    };

    const onSubmit = () => {
      formRef.value
          .validate()
          .then(() => {
            axios.post('/test/createTest', formState).then(res => {
              message.success(`创建考试成功！`);
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
      formRef,
      rules,
      formState,
      onSubmit,
      filterOption,
    };
  }
});
</script>

<style scoped>

</style>