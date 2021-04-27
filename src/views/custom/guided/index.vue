<template>
    <div id="wrapper" align="center">

        <div id="pano" align="center"></div>
    </div>
    <div id="department-info">
        <div id="slide">
            <a-menu
                    v-model:openKeys="openKeys"
                    v-model:selectedKeys="selectedKeys"
                    style="margin-top: 20px"
                    mode="vertical"
                    @click="handleClick"
            >
                <a-menu-item key="1">
                    前台
                </a-menu-item>
                <a-menu-item key="2">
                    诊室
                </a-menu-item>
                <a-menu-item key="3">
                    免疫室
                </a-menu-item>
                <a-menu-item key="4">
                    化验室
                </a-menu-item>
                <a-menu-item key="5">
                    影像室
                </a-menu-item>
            </a-menu>
        </div>
        <div id="info-card">
           <a-card
                   style="width: 100%; margin:auto"
                   title="科室管理"
                   :tab-list="tabList"
                   :active-tab-key="key"
                   @tabChange="key => onTabChange(key, 'key')"
           >
               <template #info="item">
                   <span><home-outlined/>{{ item.key }}</span>
               </template>
               <template #person="item">
                   <span><user-outlined/>{{ item.key }}</span>
               </template>
               {{ contentList[key] }}
           </a-card>
       </div>
    </div>
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
                data,
                tabList: [
                    {
                        key: '科室信息',
                        // tab: 'tab1',
                        // scopedSlots: {tab: 'customRender'},
                        slots: {tab: 'info'},
                    },

                    {
                        key: '科室负责人',
                        // tab: 'tab2',
                        slots: {tab: 'person'}
                    },

                ],
                contentList: {
                    tab1: 'content1',
                    tab2: 'content2',
                },
            };
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
            onTabChange(key, type) {
                console.log(key, type);
                this[type] = key;
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
        align-items: center;
        justify-content: center;
    }
    #info-card {
        margin-top: 20px;
        width: 65%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #slide {
        margin-top: 20px;
        margin-right: 20px;
        width: 13%;
    }

</style>

