<template>
  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="2"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <div>
          <a-space :size="20">
            <a-button type="primary" @click="onAdd">增加病例</a-button>


            <a-cascader
                v-model:value="diseaseId"
                :field-names="{ label: 'name', value: 'id', children: 'children'}"
                :options="options"
                placeholder="请选择病种"
                @change="onSelectChange"
                :allowClear="false"
                expandTrigger="hover"
            />

          </a-space>
          <br><br>

          <a-table
              rowKey="id"
              :columns="columns"
              :data-source="caseList.list"
              :loading="loading"
              :pagination="false"
          >
            <template #index="{ index }">
              {{ parseInt(index) + 1 }}
            </template>
            <template #question="{ text, record, index }">
              <a-popover :title="text" overlayClassName="pop-card">
                <template #content>
                  <span>A. {{ record.a }}</span><br>
                  <span>B. {{ record.b }}</span><br>
                  <span>C. {{ record.c }}</span><br>
                  <span>D. {{ record.d }}</span><br><br>
                  <span>答案：{{ record.answer }}</span>
                </template>
                <span class="text_overflow-hidden" style="cursor: pointer; width: 800px">{{ text }}</span>
              </a-popover>
            </template>
            <template #action="{ record,index }">
              <span>
                <router-link :to="`/case/detail?id=${record.id}`">详情</router-link>
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
              :total="caseList.total"
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
import { defineComponent, toRefs, ref, getCurrentInstance, onMounted, reactive } from 'vue';
import AdminMenu from "../../../components/Header/AdminMenu.vue";
import {message} from "ant-design-vue";

export default defineComponent({
  components: {AdminMenu},
  data() {
    return {
      columns: [
        {title: '#', width:'80px',dataIndex: 'index', slots: {customRender: 'index'}},
        {title: '病例ID', width:'100px', dataIndex: 'id'},
        {title: '病例名称', dataIndex: 'name'},
        {
          title: '操作',
          dataIndex: 'action',
          width:'120px',
          slots: {customRender: 'action'},
        },
      ],

      classification: [],
      caseList: {
        total: 1,
        list: [],
      },
      options: [],
      diseaseId: [],
    }
  },
  created() {
    this.getClassList();

  },
  methods: {
    getData(id) {
      this.$axios.post('/case/getcases', this.pageParam, {
        params: {diseaseId: id}
      }).then(res => {
        this.caseList = res;
        this.loading = false;
      });
    },
    getClassList(){
      this.$axios.post('/disease/getClasses').then(res => {
        this.classification = res;
        this.options.length = 0;
        for (const item of res) {
          this.options.push({id: item.id, name: item.name, children: []});
        }
        for (let i = 0; i < this.options.length; i++) {
          this.getDiseaseList(i, this.options[i].id);
        }

      });
    },
    getDiseaseList(i, id) {
      this.$axios.post('/disease/get', null, {
        params: {diseaseClassId: id}
      }).then(res => {
        this.options[i].children = res;
        if(this.diseaseId.length === 0 && this.options[0].children.length !== 0) {
          this.diseaseId.push(this.options[0].id);
          this.diseaseId.push(res[0].id);
          this.getData(this.diseaseId[1]);
        }
      });
    },
    onPageChange() {
      this.loading = true;
      this.getData(this.diseaseId);
    },
    onSelectChange(val) {
      console.log()
      this.loading = true;
      this.getData(val[1]);
    },
    onAdd() {
      this.$router.push('/case/add');
      localStorage.setItem('diseaseOptions', JSON.stringify(this.options));
    },
    onDelete(id) {
      this.$axios.post('/case/delete', null , {params: {
          id: id
        }}).then(res => {
        message.success('删除成功!');
        this.getData(this.diseaseId[1]);
      });
    },
  },
  setup() {
    const pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    const loading = ref(true);
    return {
      pageParam,
      loading,
    };
  },
});
</script>
