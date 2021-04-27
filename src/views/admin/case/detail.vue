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

                <p>{{ consultation.describe }}</p>

                <div v-for="(item, i) in consultation.images"  style="text-align: center; margin: 20px">
                  <a-image :src="item.url"/><br>
                  <span>{{ item.description }}</span>
                </div>
                <div v-for="(item, i) in consultation.videos"  style="text-align: center; margin: 20px">
                  <video :src="item.url" :controls="{controls: true}"></video><br>
                  <span>{{ item.description }}</span>
                </div>

              </a-spin>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="病例检查">
              <a-spin :spinning="loading" tip="Loading...">

                <p>{{ examination.describe }}</p>

                <div v-for="(item, i) in examination.images"  style="text-align: center; margin: 20px">
                  <a-image :src="item.url"/><br>
                  <span>{{ item.description }}</span>
                </div>
                <div v-for="(item, i) in examination.videos"  style="text-align: center; margin: 20px">
                  <video :src="item.url" :controls="{controls: true}"></video><br>
                  <span>{{ item.description }}</span>
                </div>

              </a-spin>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="诊断结果">
              <a-spin :spinning="loading" tip="Loading...">

                <p>{{ diagnosis.describe }}</p>

                <div v-for="(item, i) in diagnosis.images"  style="text-align: center; margin: 20px">
                  <a-image :src="item.url"/><br>
                  <span>{{ item.description }}</span>
                </div>
                <div v-for="(item, i) in diagnosis.videos"  style="text-align: center; margin: 20px">
                  <video :src="item.url" :controls="{controls: true}"></video><br>
                  <span>{{ item.description }}</span>
                </div>

              </a-spin>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="治疗方案">
              <a-spin :spinning="loading" tip="Loading...">

                <p>{{ treatment.describe }}</p>

                <div v-for="(item, i) in treatment.images"  style="text-align: center; margin: 20px">
                  <a-image :src="item.url"/><br>
                  <span>{{ item.description }}</span>
                </div>
                <div v-for="(item, i) in treatment.videos"  style="text-align: center; margin: 20px">
                  <video :src="item.url" :controls="{controls: true}"></video><br>
                  <span>{{ item.description }}</span>
                </div>

              </a-spin>
            </a-collapse-panel>
          </a-collapse>
          <br><br>
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
