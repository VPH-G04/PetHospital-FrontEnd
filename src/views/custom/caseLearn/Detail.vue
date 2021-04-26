<template>
  <a-layout style="min-height: 91%">
    <a-layout-content style="padding: 0 50px">
      <a-page-header
          style="padding: 20px 60px"
          :title="'病例详情-' + caseVO.name"
          :breadcrumb="{ routes }"
          @back="() => $router.go(-1)"
      />
      <div style="margin: 0 60px">
        <a-collapse v-model:activeKey="activeKey">
          <a-collapse-panel key="1" header="接诊">
            <a-spin :spinning="loading" tip="Loading...">
              {{ caseVO.procedureVOS }}
            </a-spin>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="病例检查">
            <a-image v-if="examination.images.length" :src="examination.images.length ? examination.images[0].url : ''"></a-image>
            <p> {{ examination.describe }}</p>
            <video
                v-if="examination.videos.length" :src="examination.videos.length ? examination.videos[0] : ''">
            </video>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="诊断结果">

          </a-collapse-panel>
          <a-collapse-panel key="4" header="治疗方案">

          </a-collapse-panel>
        </a-collapse>

      </div>

    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, onMounted, reactive, ref} from "vue";

export default defineComponent({
  data() {
    return {
      routes: [
        {
          path: '/case-learn',
          breadcrumbName: '',
        },
        {
          path: '/case',
          breadcrumbName: '',
        },
        {
          path: '/detail',
          breadcrumbName: '',
        }
      ],
      disease: {
        id: 1,
        classification: '',
        name: ''
      },
      caseVO: {
        id: 1,
        name: '',
        procedureVOS: [{
          describe:'',
          images: [],
          videos: [],

        }],
      },
      consultation: {
        describe:'',
        images: [],
        videos: [],
      },
      examination: {
        describe:'',
        images: [],
        videos: [],
      },
      diagnosis: {
        describe:'',
        images: [],
        videos: [],
      },
      treatment: {
        describe:'',
        images: [],
        videos: [],
      },
    }
  },
  created() {
    this.disease = JSON.parse(localStorage.getItem('disease'));
    this.routes[0].breadcrumbName = this.disease.classification;
    this.routes[1].breadcrumbName = this.disease.name;
    this.routes[1].path = '/case?diseaseId=' + this.disease.id;
    this.getData(this.$route.query.caseId);
  },
  methods: {
    getData(id) {
      this.$axios.post('/case/get', null, {
        params: {
          id: id
        }
      }).then(res => {
        this.caseVO = res;
        this.loading = false;
        this.routes[2].breadcrumbName = this.caseVO.name;
        for (const item of this.caseVO.procedureVOS) {
          switch (item.procedureName) {
            case 'consultation':
              this.consultation = item;
              break;
            case 'examination':
              this.examination = item;
              break;
            case 'diagnosis':
              this.diagnosis = item;
              break;
            case 'treatment':
              this.treatment = item;
              break;
          }
        }

      });
    },
  },
  setup() {
    const loading = ref(true);
    const activeKey = ref(['1']);
    return { loading,activeKey };
  }
});
</script>

<style scoped>

</style>