<template>
  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="4"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <a-space :size="20">
          <a-button type="primary" @click="onAdd">增加试卷</a-button>
          <a-input-search
              v-model:value="value"
              placeholder="搜索试卷名称"
              enter-button
              @search="onSearch"
          />
        </a-space>
        <br><br>
        <a-table
            rowKey="id"
            :columns="columns"
            :data-source="paperList.list"
            :loading="loading"
            :pagination="false"
        >
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
        />
        <br>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import AdminMenu from "@/components/Header/AdminMenu";

export default defineComponent({
  components: {AdminMenu},
  data() {
    return {
      columns: [
        {title: 'ID', dataIndex: 'id'},
        {title: '名称', dataIndex: 'name'},
        {title: '分值', dataIndex: 'score'},
        {
          title: '操作',
          dataIndex: 'action',
          width: '120px',
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
      this.$axios.post('/paper/deletePaper', null, {
        params: {
          paperId: id
        }
      }).then(res => {
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
