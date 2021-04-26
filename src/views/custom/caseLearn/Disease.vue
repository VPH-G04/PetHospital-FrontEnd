<template>

  <a-spin :spinning="loading" tip="Loading...">
  <div class="page" :style="'background-image:url('+img1+')'"
       style="background-size:100% 150%;background-attachment: fixed;
       background-repeat: no-repeat;">
    <a-layout-content style="padding: 0 50px">
      <br>

      <a-row type="flex" justify="center" style="margin: 20px 10px; min-width: 1050px">
        <a-col style="min-width: 800px;max-width: 1000px">
          <a-card style="margin: 0 50px 50px 20px;opacity: 0.9;box-shadow: 2px 2px 10px #888888;">

              <div v-for="(item, i) in classification" :id="'disease-'+i">
                <h2> {{item.name}}</h2>
                <a-divider></a-divider>

                <div style="margin: 0 0 20px">
                  <a-row>
                    <a-button v-for="(item, j) in diseaseList[i].disease"
                              style="width: 20%;min-width: 200px;height: 50px;margin: 10px;font-weight: bold;font-size: 16px"
                              @click="toDetail(i, j, item.id)">
                      {{ item.name }}
                    </a-button>
                  </a-row>
                </div>
              </div>

          </a-card>
        </a-col>
        <a-col style="width: 100px">

            <a-affix :offset-top="20">
              <div style="box-shadow: 2px 2px 10px #888888;border-radius: 10px;background-color: white;padding: 10px">
              <a-anchor  @click="handleClick" >
                <a-anchor-link v-for="(item, i) in classification" :href="'#disease-'+i" :title="item.name" />
              </a-anchor>
              </div>
            </a-affix>

        </a-col>
      </a-row>


    </a-layout-content>
  </div>
  </a-spin>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import { useRouter } from "vue-router";
const img1 = require('../../../assets/background4_0.6.png');
export default {
  name: "Disease",
  data() {
    return {
      classification: [{id: 1, name: ''}],
      diseaseList: [{index: 0, id: 1, disease: []}],
    }
  },
  created() {
    let _classification = JSON.parse(localStorage.getItem('classification'));
    let _disease = JSON.parse(localStorage.getItem('diseaseList'));
    if(_classification === null || _disease === null) {
      this.getData();
    } else {
      this.classification = _classification;
      this.diseaseList = _disease;
      this.loading = false;
    }

  },
  methods: {
    getData(){
      this.$axios.post('/disease/getClasses').then(res => {
        this.classification = res;
        this.diseaseList.length = 0;
        let i = 0;
        for (const item of res) {
          this.diseaseList.push({index: i++, id: item.id, disease: []});
        }
        console.log(this.diseaseList);
        for(let j = 0; j < this.diseaseList.length; j++) {
          this.getDisease(j, this.diseaseList[j].id);

        }
      });
    },
    getDisease(i, id) {
      this.$axios.post('/disease/get', null, {params: {diseaseClassId: id}}).then(res => {
        this.diseaseList[i].disease = res;
        if(i === this.diseaseList.length - 1) {
          this.loading = false;
          localStorage.setItem('classification', JSON.stringify(this.classification));
          localStorage.setItem('diseaseList', JSON.stringify(this.diseaseList));
        }
      });
    },
    toDetail(i, j, id){
      this.$router.push({path: '/case-learn/case', query:{
          diseaseId:id
        }});
      const disease = {
        id: id,
        classification: this.classification[i].name,
        name: this.diseaseList[i].disease[j].name
      };
      localStorage.setItem('disease', JSON.stringify(disease));
    },
  },
  setup() {
    const loading = ref(true);
    const activeKey = ref([]);
    const handleClick = (e, link) => {
          e.preventDefault();
        };
    return {
      activeKey,
      loading,
      img1,
      handleClick,
    }
  }
};
</script>

<style lang="less" scoped></style>
