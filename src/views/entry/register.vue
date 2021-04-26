<template>

  <div :style="'background-image:url('+img1+')'"
       style="height: 100%; width: 100%;position: fixed;
       background-repeat: no-repeat;background-position: 10% center">
    <a-card style="margin: 100px 120px 0;width: 430px;float: right;opacity: 0.95;box-shadow: 2px 2px 10px #888888;">

      <h2>注册</h2>
      <a-divider></a-divider>
      <a-form
          name="custom-validation"
          ref="formRef"
          style="width: 450px;"
          :model="formState"
          :rules="rules"
          v-bind="layout"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
      >
        <a-form-item has-feedback label="电子邮箱" name="email">
          <a-input v-model:value="formState.email" type="email" autocomplete="off" />
        </a-form-item>
        <a-form-item required has-feedback label="用户名" name="username">
          <a-input v-model:value="formState.username" autocomplete="off" />
        </a-form-item>
        <a-form-item required has-feedback label="密码" name="password">
          <a-input v-model:value="formState.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPass">
          <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
        </a-form-item>
        <div class="tips">
          <router-link to="/login">返回登录</router-link>
        </div>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }" style="margin-bottom: 0">
          <a-button type="primary" block html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>

    </a-card>
  </div>


</template>
<script>
import { message, Modal } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/utils/axios';
const img1 = require('../../assets/background2.jpg');

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState = reactive({
      password: '',
      checkPass: '',
      email: '',
      username: ''
    });
    const router = useRouter();

    let validatePass = async (rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码');
      } else {
        if (formState.checkPass !== '') {
          formRef.value.validateField('checkPass');
        }

        return Promise.resolve();
      }
    };

    let validatePass2 = async (rule, value) => {
      if (value === '') {
        return Promise.reject('请输入确认密码');
      } else if (value !== formState.password) {
        return Promise.reject('密码不一致');
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      password: [{ validator: validatePass, trigger: 'change' }],
      checkPass: [{ validator: validatePass2, trigger: 'change' }],
      username: [{ required: true, message: '请输入用户名' }],
      email: [
        { required: true, message: '请输入电子邮箱' },
        { type: 'email', message: '邮箱格式不正确' }
      ]
    };

    const handleFinish = async values => {
      await axios.post('/register', values);
      Modal.success({
        title: '注册成功！',
        okText: '返回登录',
        onOk() {
          router.push('/login');
        }
      });
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formState,
      formRef,
      rules,
      layout,
      img1,
      handleFinishFailed,
      handleFinish,
      resetForm
    };
  }
});
</script>

<style scoped>
.tips {
  text-align: right;
  margin-bottom: 20px;
  margin-right: 120px;
}
</style>