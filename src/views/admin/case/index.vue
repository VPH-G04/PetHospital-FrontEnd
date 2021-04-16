<template>
  <a-table
    rowKey="id"
    :showHeader="false"
    :columns="columns"
    :data-source="dataList"
    :loading="loading"
    :pagination="false"
    class="p-container w-500"
  >
    <template #title>
      <a-button type="primary">增加病例</a-button>
    </template>

    <template #action="{ record }">
      <span>
        <router-link :to="`/case/details?id=${record.id}`">详情</router-link>
        <a-divider type="vertical" />
        <router-link :to="`/case/details?id=${record.id}`">编辑</router-link>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除此病例？" @confirm="onDelete(record.id)">
          <a href="#">删除</a>
        </a-popconfirm>
      </span>
    </template>
  </a-table>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, toRefs, ref, getCurrentInstance, onMounted, reactive } from 'vue';
import useList from '@/hooks/useList';
import axios from '@/utils/axios';

const columns = [
  {
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Action',
    key: 'action',
    width: 160,
    slots: { customRender: 'action' }
  }
];

export default defineComponent({
  setup(props, ctx) {
    const listProps = useList({
      getList: () => axios.get('/getCase'),
      deleteItem: id => axios.delete(`/case/delete/${id}`)
    });

    return {
      ...listProps,
      columns
    };
  },
  components: {
    SmileOutlined,
    DownOutlined
  }
});
</script>
