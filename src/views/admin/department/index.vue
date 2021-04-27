<template>

  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="0"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <div>
          <a-drawer
              placement="right"
              :closable="false"
              :visible="visible"
              :get-container="false"
              width="50%"
              :wrap-style="{ position: 'absolute' }"
              @close="onClose"
          >
            <a-form
                ref="formRef"
                layout="vertical"
                :model="formState"
                :rules="rules"
                style="width: 350px; margin: 40px auto 0"
            >
              <h1 v-if="departmentId" class="text-center" style="font-weight: bold">编辑科室</h1>
              <h1 v-else class="text-center" style="font-weight: bold">新增科室</h1><br>

              <a-form-item name="name" label="科室名称">
                <a-textarea v-model:value="formState.name" placeholder="请输入科室名称" auto-size></a-textarea>
              </a-form-item>
              <a-form-item name="describe" label="科室信息">
                <a-textarea v-model:value="formState.describe" placeholder="请输入科室信息" :auto-size="{ minRows: 2, maxRows: 5 }"></a-textarea>
              </a-form-item>
              <a-form-item name="principal" label="负责人">
                <a-textarea v-model:value="formState.principal" placeholder="请输入负责人" auto-size></a-textarea>
              </a-form-item>

              <a-button block type="primary" @click="onSubmit">提交</a-button><br><br>
            </a-form>

          </a-drawer>

          <a-space :size="20">
            <a-button type="primary" @click="onAdd">增加科室</a-button>

            <a-input-search
                v-model:value="value"
                placeholder="搜索科室名称"
                enter-button
                @search="onSearch"
            />
          </a-space>
          <br><br>

          <a-table
              rowKey="id"
              :columns="columns"
              :data-source="departmentList.list"
              :loading="loading"
              :pagination="false"
          >
            <template #index="{ index }">
              {{ parseInt(index) + 1 }}
            </template>
            <template #describe="{ text, record, index }">
              <a-popover overlayClassName="pop-card">
                <template #content>
                  {{text}}
                </template>
                <span class="text_overflow-hidden" style="cursor: pointer; width: 600px">{{ text }}</span>
              </a-popover>
            </template>
            <template #action="{ record,index }">
        <span>
          <a-typography-link @click="onEdit(index)">编辑</a-typography-link>
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
              :total="departmentList.total"
              :show-total="total => `共 ${total} 条`"
              @showSizeChange="onPageChange"
              @change="onPageChange"
              style="text-align: center"
          /><br>
        </div>
      </div>
    </a-layout-content>
  </a-layout>


</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import AdminMenu from "@/components/Header/AdminMenu";
import {useRouter} from "vue-router";
import axios from "../../../utils/axios";

export default defineComponent({
  components: {AdminMenu},
  data() {
    return {
      columns: [
        {title: 'ID', width:'70px', dataIndex: 'id'},
        {title: '科室名称', width:'120px', dataIndex: 'name'},
        {title: '科室信息', dataIndex: 'describe', slots: {customRender: 'describe'}},
        {title: '负责人', width:'150px', dataIndex: 'principal'},
        {
          title: '操作',
          dataIndex: 'action',
          width:'120px',
          slots: {customRender: 'action'},
        },
      ],
      visible: false,
      departmentList: {
        total: '1',
        list: [],
      },
      departmentId: 0,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get('/department/list?pageSize='+this.pageParam.pageSize+'&pageNum='+this.pageParam.pageNum).then(res => {
        this.departmentList = res;
        console.log(this.departmentList);
        this.loading = false;
      });
    },
    onPageChange() {
      this.loading = true;
      this.getData();
    },
    onAdd() {
      this.departmentId = 0;
      this.showDrawer();
    },
    onEdit(index) {
      this.departmentId = this.departmentList.list[index].id;
      this.formState.name = this.departmentList.list[index].name;
      this.formState.describe = this.departmentList.list[index].describe;
      this.formState.principal = this.departmentList.list[index].principal;
      this.showDrawer();
    },
    onDelete(id) {
      this.$axios.post('/department/delete', null , {params: {
          departmentId: id
        }}).then(res => {
        message.success('删除成功!');
        this.getData();
      });
    },
    showDrawer() {
      this.visible = true;
    },
    onSubmit() {
      this.formRef.validate()
          .then(() => {

            if(this.departmentId) {
              this.$axios.post('/department/mod', {id: this.departmentId ,...this.formState}).then(res => {
                message.success(`修改成功！`);
                this.onClose();
              });
            } else {
              this.$axios.post('/department/add', this.formState).then(res => {
                message.success(`创建成功！`);
                this.onClose();
              });
            }

          })
          .catch(error => {
            console.log('error', error);
          });
    },

  },
  setup(props, ctx) {
    const loading = ref(true);
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    const visible = ref(false);
    let question = reactive({});
    const onClose = () => {
      visible.value = false;
      formState.name = '';
      formState.describe = '';
      formState.principal = '';
    };
    const router = useRouter();
    const formRef = ref();
    const formState = reactive({ name: '', describe: '', principal: ''});
    const rules = {
      name: [{ required: true, message: '请输入科室名称', trigger: 'change' }],
      describe: [{ required: true, message: '请输入科室信息', trigger: 'change' }],
      principal: [{ required: true, message: '请输入负责人', trigger: 'change' }],
    };
    return {
      pageParam,
      loading,
      visible,
      question,
      router,
      formRef,
      rules,
      formState,
      onClose,
    }
  }
});
</script>

<style lang="less" scoped></style>
