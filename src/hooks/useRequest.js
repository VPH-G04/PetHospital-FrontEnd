import { message } from 'ant-design-vue';
import { ref, onMounted } from 'vue';

// manual 手动触发
export default function useRequest(requestMethod, options = { manual: false, onSuccess }) {
  const { manual = false, onSuccess } = options;

  const loading = ref(false);

  const run = () => {
    loading.value = true;
    return requestMethod()
      .then(res => {
        if (typeof onSuccess === 'function') onSuccess(res);
        return res;
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  onMounted(() => {
    if (!manual) run();
  });

  // const request = () => {};

  return { run, loading };
}
