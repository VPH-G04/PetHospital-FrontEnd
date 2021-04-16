<template>
  <a-form
    name="custom-validation"
    class="p-container"
    style="width: 520px"
    ref="formRef"
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

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" block html-type="submit">注册</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { message, Modal } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/utils/axios';

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
      handleFinishFailed,
      handleFinish,
      resetForm
    };
  }
});
</script>
