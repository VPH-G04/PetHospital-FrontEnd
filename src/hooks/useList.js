import { ref, onMounted, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import useRequest from './useRequest';

export default function useList({ getList, deleteItem }) {
  const state = reactive({ dataList: [] });
  const { loading, run } = useRequest(getList, {
    onSuccess(res) {
      state.dataList = res.list;
    }
  });

  const onDelete = async id => {
    await deleteItem(id);
    message.success('删除成功');
    // run();
    state.dataList = state.dataList.filter(d => d.id !== id);
  };

  return { loading, ...toRefs(state), onDelete };
}
