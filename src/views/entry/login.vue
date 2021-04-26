<template>
  <div :style="'background-image:url('+img1+')'"
       style="height: 100%; width: 100%;position: fixed;
       background-repeat: no-repeat;background-position: 10% center">
    <a-card style="margin: 120px 150px 0;width: 350px;float:right;opacity: 0.95;box-shadow: 2px 2px 10px #888888;">
      <a-form
          ref="formRef"
          layout="vertical"
          :model="formState"
          :rules="rules"
          style="margin: auto;"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
      >

        <h2>登录</h2>
        <a-divider></a-divider>

        <a-form-item name="email" label="邮箱">
          <a-input v-model:value="formState.email" type="email" placeholder="请输入邮箱">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)"/></template>
          </a-input>
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="formState.password" type="password" placeholder="请输入密码">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)"/></template>
          </a-input>
        </a-form-item>
        <div class="tips">
          <router-link to="/register">没有账户？去注册</router-link>
        </div>
        <a-button block type="primary" @click="onSubmit">登录</a-button>
      </a-form>
    </a-card>
  </div>

</template>
<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, reactive, ref } from 'vue';
import axios from '@/utils/axios';
import { message } from 'ant-design-vue';
import useUserStore from '@/hooks/useUserStore';
import { useRouter } from 'vue-router';
const img1 = require('../../assets/background2.jpg');

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const { updateUserInfo } = useUserStore();
    const router = useRouter();

    const formRef = ref();
    const formState = reactive({ email: '', password: '' });
    const rules = {
      email: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
      password: [{ required: true, message: '请输入密码', trigger: 'change' }]
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          axios.post('/login', formState).then(res => {
            message.success(`登录成功，欢迎您，${res.username}`);
            updateUserInfo(res);

            router.push(res.admin ? '/user' : '/guided');
          });
        })
        .catch(error => {
          console.log('error', error);
        });
    };
    return {
      formRef,
      rules,
      formState,
      img1,
      onSubmit
    };
  }
});
</script>

<style scoped>
.tips {
  text-align: right;
  margin-bottom: 24px;
}
</style>
