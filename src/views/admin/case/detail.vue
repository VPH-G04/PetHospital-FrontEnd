<template>
  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="2"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <a-page-header
            :title="'病例详情-' + caseVO.name"
            @back="() => $router.go(-1)"
        />
        <div>
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
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, onMounted, reactive, ref} from 'vue';
import AdminMenu from "@/components/Header/AdminMenu";

export default defineComponent({
  components: {AdminMenu},
  data() {
    return {
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
    this.getData(this.$route.query.id);
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

<style lang="less" scoped></style>
