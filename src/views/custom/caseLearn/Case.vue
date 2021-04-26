<template>
  <a-layout style="min-height: 91%">
    <a-layout-content style="padding: 0 50px">
      <a-page-header
          style="padding: 20px 60px"
          :title="'病例列表-' + disease.name"
          :breadcrumb="{ routes }"
          @back="() => $router.go(-1)"
      />
      <a-spin :spinning="loading" tip="Loading...">
        <div style="padding: 20px 50px; min-height: 400px">
          <div style="min-height: 450px">
            <a-row>
              <a-empty v-if="caseList.total === 0" style="margin: 100px auto"></a-empty>
              <a-card v-for="(item, i) in caseList.list" hoverable="true"
                      style="width: 20%;min-width: 300px; margin: 10px; cursor: pointer; border: 1px solid #dbdbdb" @click="toDetail(i, item.id)">
                <div style="font-size: 20px">{{ item.name }}</div>
              </a-card>
            </a-row>
          </div>

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
          />
        </div>
      </a-spin>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, onMounted, reactive, ref} from 'vue';

export default defineComponent({
  data() {
    return {
      routes: [
        {
          path: '/case-learn',
          breadcrumbName: '病种',
        },
        {
          path: '/case',
          breadcrumbName: '病名',
        }
      ],
      disease: {
        id: 1,
        classification: '',
        name: ''
      },
      caseList: {
        total: 1,
        list: [],
      },
    }
  },
  created() {
    this.disease = JSON.parse(localStorage.getItem('disease'));
    this.routes[0].breadcrumbName = this.disease.classification;
    this.routes[1].breadcrumbName = this.disease.name;
    this.getData(this.$route.query.diseaseId);
  },
  methods: {
    getData(id) {
      this.$axios.post('/case/getcases', this.pageParam, {
        params: {
          diseaseId: id
        }
      }).then(res => {
        this.caseList = res;
        this.loading = false;
      });
    },
    onPageChange() {
      this.loading = true;
      this.getData(this.$route.query.diseaseId);
    },
    toDetail(i, id){
      this.$router.push({path: '/case-learn/detail', query:{
          caseId:id
        }});
      localStorage.setItem('case', JSON.stringify(this.caseList.list[i]));
    },
  },
  setup() {
    const loading = ref(true);
    const state = reactive({
      str: `
      盆骨骨折:该类型骨折较为复杂，盆骨中的髂骨与荐髂关节连接起到支撑身体后
      方重量，与运动机能联动。另外,完好的盆骨对盆腔内器官起到保护作用。髋臼
      也是盆骨一部分，与股骨头形成髋关节，此外还有耻骨，坐骨,都承担着着各自
      的生理机能。病例:三岁的泰迪，车祸导致盆骨髂骨翼骨折，髋臼窝骨折，耻
      骨骨折变形。手术采取钢板固定髂骨，因其考虑髋臼损伤,切除股骨头。术后恢
      复很快，愈合良好。
      `
    });
    let pageParam = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    onMounted(async () => {});

    return { state, pageParam, loading };
  }
});
</script>

<style lang="less" scoped></style>
