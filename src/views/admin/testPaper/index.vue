<template>
  <div>
    <a-table
        rowKey="id"
        :columns="columns"
        :data-source="paperList.list"
        :loading="loading"
        :pagination="false"
        style="margin: 10px auto 0;width: 800px"
    >
      <template #title>
        <a-button type="primary" @click="onAdd">增加试卷</a-button>
      </template>
      <template #action="{ record }">
        <span>
          <router-link :to="`/testPaper/detail?id=${record.id}`">详情</router-link>
          <!--          <a-divider type="vertical"/>-->
          <!--          <router-link :to="`/case/details?id=${record.id}`">编辑</router-link>-->
          <a-divider type="vertical"/>
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
        :total="paperList.total"
        :show-total="total => `共 ${total} 条`"
        @showSizeChange="onPageChange"
        @change="onPageChange"
        style="text-align: center"
    /><br>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {message} from "ant-design-vue";

export default defineComponent({
  data() {
    return {
      columns: [
        {title: 'ID', dataIndex: 'id'},
        {title: '名称', dataIndex: 'name'},
        {title: '分值', dataIndex: 'score'},
        {
          title: '操作',
          dataIndex: 'action',
          slots: {customRender: 'action'},
        },
      ],
      paperList: {
        total: '1',
        list: [{
          "id": 1,
          "name": "试卷一",
          "score": 100
        }],
      },
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post('/paper/getPaperList', this.pageParam).then(res => {
        this.paperList = res;
        this.loading = false;
      });
    },
    onPageChange() {
      this.loading = true;
      this.getData();
    },
    onDelete(id) {
      this.$axios.post('/paper/deletePaper', null , {params: {
          paperId: id
        }}).then(res => {
        message.success('删除成功!');
        this.getData();
      });
    },
    onAdd() {
      this.$router.push('/testPaper/add');
    },
  },
  setup() {
    const loading = ref(true);
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    return {
      pageParam,
      loading,
    }
  }
});
</script>

<style lang="less" scoped></style>
