<template>
  <a-layout style="min-height: 91%">
    <a-layout-content style="padding: 0 50px">
      <a-page-header
          style="padding: 20px 100px 0 60px"
          :breadcrumb="{ routes }"
      ></a-page-header>

      <a-card style="margin: 20px auto; width: 90%">
        <h2 style="font-weight: bold">
          {{ state.mapList[index].title }}
        </h2>

        <p v-for="(item, i) in state.mapList[index].content">
          {{ item }}
        </p>
        <div style="text-align: center; margin: 20px">
          <a-image v-if="index === '0'" :width="500" :src="img1"/>
          <a-image v-if="index === '1'" :width="500" :src="img2"/>
          <a-image v-if="index === '2'" :width="500" :src="img3"/>
          <br><br>
          <video :src="video1" :controls="{controls: true}"></video>
        </div>



      </a-card>

    </a-layout-content>
  </a-layout>

</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
const video1 = require('../../../assets/VTS_023.mp4');
const img1 = require('../../../assets/background1.png');
const img2 = require('../../../assets/background2.jpg');
const img3 = require('../../../assets/background3.png');


export default defineComponent({
  setup() {
    const route = useRoute();
    const state = reactive({
      mapList: [
        {
          title: '前台学习',
          content: [
            '前台职责:建立并管理病历档案;接听来电、安排预约、售后通知、提醒疫苗客户、回访会员客户等;核查患病 动物入院、出院等手续是否完整;接待客户并引领服务;保持前台、接待区域的舒适、整洁和安全防范工作;以 专业的知识和热情的态度接听电话并处理相关事宜;维持前台区域的工作秩序;合理应用医院电脑软件程序,对 前台的办公设备进行保养等。',
            '每天工作流程: ',
            '(1)营业前:提醒员工打卡，并做好监督;检查员工服务仪容;前台工作区域的卫生清洁等。',
            '(2)营业中:检查《客户回访登记表》、《来电登记表》 、《预约登记表》 ;向院长提供需要回访的客户资 料，以便院长安排回访工作;客户接待、服务引领和现场销售活动等;接听电话、 安排预约、售后通知等,客户 回访和邀约工作;收银现金的对账，确保物、 账对应;核查患病动物入院、出院等手续是否完整及准备好各种手 续所需的物料:客户意见调查，了 解客户感受,对医院的评价，以及客户对医院有什么合理建议等;维持前台形 象，保持环境清洁卫生并填写《巡查登记》;客户资料更新和分析;向院长汇报销售情况、市场活动、客户管理 及工作中遇上的重大情况:提升工作技能，学习产品知识，牢记每位宠物的信息。',
            '(3)下班前:做好各项工作报表，检查单据填写是否完善、规范;检查当天的客户资料、核对营业额，并对 单、交账;总结当天的业绩、工作与计划的差距:检查工作范围内的货品、电源设施等情况;及时记录当天未处 理的事项,做好交班工作(填写交接表并当面交接)。'
          ],

        },
        {
          title: '医师学习',
          content: [
            '1.宠物医生学习各种宠物疾病的知识，对每种疾病进行诊断,优化治疗方案，了解治疗效果。',
            '2.学习宠物疾病治疗技术，包括外科和骨科学的一些知识。',
            '3.宠物医生学习宠物疾病诊断技术，包括计算机断层扫描术(CT)、磁共振成像术 (MRI) 诊断技术、神经系统检查、粪便寄生虫学检查、血液生化和血常规检验、输血医学、抗菌药物的临床应用以及内分泌功能检查等。',
            '4.学习常用药物及其用法，学习药理学，学习包括新药和特效药的用量、用法和注意事项等内容。',
            '5.学习临床检查方法，问诊、视诊、触诊、叩诊、听诊及嗅诊。宠物的捕捉与保定，检查整体状态、被毛和皮肤、浅在淋巴结及淋巴管、可视黏膜、体温、呼吸、脉搏、血压、中心静脉压。',
            '6.实验室学习血液学检查、尿液检验、粪便检查、血液生化学检验。'
          ],
        },
        {
          title: '医助学习',
          content: [
            '1.医生助理轮岗打扫医院卫生，各诊室、住院部的垃圾，处理病房(清洁每个笼子，狗房洗栏板，猫房铲屎，添加食物和水)。每周两次大扫除，医生助理分摊医生诊室、大厅、病房、手术室等。',
            '2.去诊室帮医生保定一下猫或者狗， 好让医生给它们做B超(辅助医生进行诊断)。',
            '3.在医院的各个区域进行轮岗。负责在猫房和狗房的工作内容。',
            '4.及时填写记录本，早_ 上九点半左右拿给主治医生，医生好开出药单然后再拿回来随时根据当天的治疗进度更新记录本。',
            '5.根据药单配药，依次给需要输液的宠物开始输药，及时的换药。随时检查宠物的爪爪有没有肿。',
            '6.随时在群里向宠物主人更新宠物当天的治疗进度，也包括吃饭、喝水、二_便、睡觉等。',
            '7.学习打针、输液、喂药,补液。',
            '8.学习负责化验室的化验、X光的保定和手术时的助理工作。'
          ],
        }
      ],
      str: `
       
      `
    });
    const routes = reactive([
      {
        path: '/skill-learn',
        breadcrumbName: '职能学习',
      },
      {
        path: '/detail',
        breadcrumbName: state.mapList[route.query.role].title,
      }
    ]);
    onMounted(async () => {});

    return { state, index: route.query.role, routes, img1,img2,img3, video1 };
  }
});
</script>

<style lang="less" scoped></style>
