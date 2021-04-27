<template>
  <a-layout style="height: 100%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="1"></admin-menu>
    </a-layout-sider>
    <a-layout-content>

      <div style="margin: 30px auto 60px;width: 90%">

        <a-space :size="20">
          <a-button type="primary" @click="onAdd">新增用户</a-button>
          <a-input-search
              v-model:value="value"
              placeholder="搜索用户名"
              enter-button
              @search="onSearch"
          />
        </a-space>

        <br><br>
        <a-table
            rowKey="id"
            :columns="columns"
            :data-source="userList.list"
            :loading="loading"
            :pagination="false"

        >
          <template #index="{ index }">
            {{ parseInt(index) + 1 }}
          </template>

          <template v-for="col in ['username', 'email', 'password']" #[col]="{ text, record, index }" :key="col">
            <div>
              <a-input
                  v-if="currentEdit === index"
                  v-model:value="user[col]"
                  style="margin: -5px 0 -5px -10px"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>


          <template #admin="{ record, index }">

            <a-switch v-model:checked="record.admin" @change="changeAdmin(index)">
              <template #checkedChildren></template>
              <template #unCheckedChildren></template>
            </a-switch>
          </template>

          <template #action="{ record, index }">

            <span v-if="currentEdit === index">
                  <a @click="save(index)">提交</a>
                  <a-divider type="vertical"/>
                  <a @click="cancel(index)">取消</a>
            </span>
            <span v-else>
                  <a @click="edit(index)">编辑</a>
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
            :total="userList.total"
            :show-total="total => `共 ${total} 条`"
            @showSizeChange="onPageChange"
            @change="onPageChange"
            style="text-align: center"
        /><br>
      </div>

    </a-layout-content>
  </a-layout>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import {defineComponent, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import AdminMenu from "@/components/Header/AdminMenu";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons-vue";
import login from "@/views/entry/login";

export default defineComponent({
  components: {AdminMenu,CheckOutlined, CloseOutlined,},
  data() {
    return {
      columns: [
        {title: '#', width: '5%',dataIndex: 'index', slots: {customRender: 'index'}},
        {title: 'ID', width: '5%',dataIndex: 'id', },
        {title: '用户名', width: '20%',dataIndex: 'username', slots: {customRender: 'username'}},
        {title: '邮箱', width: '30%',dataIndex: 'email', slots: {customRender: 'email'}},
        {title: '密码', width: '20%',dataIndex: 'password', slots: {customRender: 'password'}},
        {title: '管理员权限', dataIndex: 'admin', slots: {customRender: 'admin'}},
        {
          title: '操作',
          dataIndex: 'action',
          width: '120px',
          slots: {customRender: 'action'},
        },
      ],
      userList: {
        total: '1',
        list: [{
          "id": 1,
          "username": '123',
          "email": "123@qq.com",
          "password": "123456",
          "admin": false
        }],
      },
      user: {},
      currentEdit: -1,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post('/user/list', this.pageParam).then(res => {
        this.userList = res;
        this.loading = false;
      });
    },
    onPageChange() {
      this.loading = true;
      this.getData();
    },
    onModify(user) {
      this.$axios.post('/user/adminUpdateUser', user).then(res => {
        message.success('修改成功!');
        this.getData();
      });
    },
    onAdd() {
      this.$router.push('/user/add');
    },
    onDelete(id) {
      this.$axios.post('/user/delete?userId='+id ).then(res => {
        message.success('删除成功!');
        this.getData();
      });
    },
    edit(index) {
      this.currentEdit = index;
      this.user = this.userList.list[index];
    },
    save(index) {
      this.onModify(this.user);
      this.currentEdit = -1;
      console.log(this.user);
    },
    cancel(index) {
      this.currentEdit = -1;
    },
    changeAdmin(index) {
     this.user = this.userList.list[index];
      this.$axios.post('/user/adminUpdateUser', this.user).then(res => {
        message.success('修改权限成功!');
      });
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
