<template>
  <div id="wrapper" align="center">
    <div id="pano" align="center"></div>
  </div>
  <div id="department-info">
    <div id="slide">
      <div style="margin-bottom: -20px; margin-left: 15px;width: 150px">
        <p style="color: #888888; margin-bottom: -10px">科室</p>
        <a-divider></a-divider>
      </div>
      <div style="overflow-y:scroll; max-height: 500px;">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            style="margin-top: 20px"
            mode="vertical"
            @click="handleClick"
        >
          <a-menu-item v-for="(item, i) in departmentList" :key="i">{{ item.name }}</a-menu-item>
        </a-menu>
      </div>

    </div>

    <div id="info-card">
      <a-card
          style="margin-top: 40px; min-height: 500px"
          :tab-list="tabList"
          @tabChange="key => onTabChange(key)"
      >
        <template #info="item">
          <span><home-outlined/>{{ item.name }}</span>
        </template>
        <template #person="item">
          <span><user-outlined/>{{ item.name }}</span>
        </template>

        <p v-if="activeKey === 1">{{ departmentList[selectedKeys[0]].describe }}</p>
        <p v-else>{{ departmentList[selectedKeys[0]].principal }}</p>
      </a-card>
    </div>
  </div>
  <br><br>
</template>
<script>
import {HomeOutlined, UserOutlined} from '@ant-design/icons-vue';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
export default {
  name: 'vtour',
  components: {
    HomeOutlined,
    UserOutlined,
  },
  data() {
    return {
      selectedKeys: [0],
      activeKey: 1,
      content: '',
      tabList: [
        {
          key: 1,
          name: '科室信息',
          slots: {tab: 'info'},
        },
        {
          key: 2,
          name: '科室负责人',
          slots: {tab: 'person'}
        },
      ],
      departmentList: [{describe:'', principal: ''}],
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    embedpano({
      swf: "./static/vtour/tour.swf",
      xml: "./static/vtour/tour.xml",
      target: "pano",
      html5: "auto",
      mobilescale: 1.0,
      passQueryParameters: true
    });
  },
  methods: {
    getorder(msg) {
      this.show = msg
    },
    onTabChange(key) {
      this.activeKey = key;
    },
    getData() {
      this.$axios.get('/department/list?pageSize=20').then(res => {
        this.departmentList = res.list;
        console.log(this.departmentList);
        this.loading = false;
      });
    },
  }
}
</script>
<style scoped>
#wrapper {
  width: 100%;
  /*display: flex;*/
  /*justify-content: center;*/
}

#pano {
  margin-top: 20px;
  width: 80%;
  height: 505px;
  display: flex;
  justify-content: center;
}

#department-info {
  flex-direction: row;
  display: flex;
  /*align-items: center;*/
  justify-content: center;
}

#info-card {
  margin-top: 20px;
  width: 65%;
  flex-direction: row;
  justify-content: center;
  /*align-items: center;*/
}

#slide {
  margin-top: 20px;
  margin-right: 20px;
  width: 13%;

}

</style>

