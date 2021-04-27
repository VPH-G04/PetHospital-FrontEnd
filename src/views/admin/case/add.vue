<template>
  <a-layout style="height: 95%; width: 100%; position: fixed">
    <a-layout-sider>
      <admin-menu init-key="2"></admin-menu>
    </a-layout-sider>
    <a-layout-content>
      <div style="margin: 30px auto;width: 90%">
        <a-form
            ref="formRef"
            layout="horizontal"
            :model="formState"
            :rules="rules"
            v-bind="layout"
            style="width: 600px; margin: 40px auto 0"
        >
          <h1 class="text-center" style="font-weight: bold">新增病例</h1><br>
          <a-form-item name="disease" label="病种">
            <a-cascader
                v-model:value="diseaseId"
                :field-names="{ label: 'name', value: 'id', children: 'children'}"
                :options="options"
                placeholder="请选择病种"
                @change="onSelectChange"
                :allowClear="false"
                expandTrigger="hover"
            />
          </a-form-item>

          <a-form-item name="name" label="病例名称">
            <a-input v-model:value="formState.name" placeholder="请输入病例名称"></a-input>
          </a-form-item>

          <a-tabs defaultActiveKey="1" size="large">
            <a-tab-pane key="0" tab="" disabled></a-tab-pane>
            <!--阶段1-->
            <a-tab-pane key="1" tab="接诊">
              <a-form-item name="consultation" label="描述">
                <a-textarea
                    v-model:value="formState.consultation"
                    placeholder="请输入描述文字"
                    auto-size
                />
              </a-form-item>
              <a-form-item name="image" label="图片">

                <img-upload :procedure="'consultation'" @change="handleChange"></img-upload>

              </a-form-item>

              <a-form-item name="video" label="视频">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :multiple="true"
                    :file-list="videoList"
                    @change="handleChange"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    Upload
                  </a-button>
                </a-upload>
              </a-form-item>

            </a-tab-pane>

            <!--阶段2-->
            <a-tab-pane key="2" tab="病例检查" force-render>
              <a-form-item name="examination" label="描述">
                <a-textarea
                    v-model:value="formState.examination"
                    placeholder="请输入描述文字"
                    auto-size
                />
              </a-form-item>
              <a-form-item name="image" label="图片">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    v-model:file-list="imageList"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    upload
                  </a-button>
                </a-upload>
              </a-form-item>

              <a-form-item name="video" label="视频">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :multiple="true"
                    :file-list="videoList"
                    @change="handleChange"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    Upload
                  </a-button>
                </a-upload>
              </a-form-item>
            </a-tab-pane>
            <!--阶段3-->
            <a-tab-pane key="3" tab="诊断结果">
              <a-form-item name="diagnosis" label="描述">
                <a-textarea
                    v-model:value="formState.diagnosis"
                    placeholder="请输入描述文字"
                    auto-size
                />
              </a-form-item>
              <a-form-item name="image" label="图片">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    v-model:file-list="imageList"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    upload
                  </a-button>
                </a-upload>
              </a-form-item>

              <a-form-item name="video" label="视频">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :multiple="true"
                    :file-list="videoList"
                    @change="handleChange"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    Upload
                  </a-button>
                </a-upload>
              </a-form-item>
            </a-tab-pane>
            <!--阶段4-->
            <a-tab-pane key="4" tab="治疗方案">
              <a-form-item name="treatment" label="描述">
                <a-textarea
                    v-model:value="formState.treatment"
                    placeholder="请输入描述文字"
                    auto-size
                />
              </a-form-item>
              <a-form-item name="image" label="图片">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    v-model:file-list="imageList"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    upload
                  </a-button>
                </a-upload>
              </a-form-item>

              <a-form-item name="video" label="视频">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :multiple="true"
                    :file-list="videoList"
                    @change="handleChange"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    Upload
                  </a-button>
                </a-upload>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>


          <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
            <a-button block type="primary" @click="onSubmit">提交</a-button><br><br>
<!--            <a-button block @click="$router.go(-1)">取消</a-button>-->
          </a-form-item>

        </a-form>

      </div>
    </a-layout-content>
  </a-layout>

</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import {PlusOutlined, UploadOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import axios from "@/utils/axios";
import {message} from "ant-design-vue";
import AdminMenu from "@/components/Header/AdminMenu";
import qs from 'qs';
import ImgUpload from "@/components/file/ImgUpload";



const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};
export default defineComponent({
  components: {ImgUpload, AdminMenu, UploadOutlined, PlusOutlined},
  data() {
    return {
      options: [],
      diseaseId: [],
    }
  },
  methods: {
    onSelectChange(val) {
      this.formState.disease_id = this.diseaseId[1];
    },

    handleChange(fileList, procedure) {
      switch (procedure) {
        case 'consultation':
          this.list.imageList1 = fileList;
          break;
        case 'examination':
          this.list.imageList2 = fileList;
          break;
        case 'diagnosis':
          this.list.imageList3 = fileList;
          break;
        case 'treatment':
          this.list.imageList4 = fileList;
          break;
      }
    },
  },
  created() {
    this.options = JSON.parse(localStorage.getItem('diseaseOptions'));

  },
  setup() {
    const router = useRouter();
    const state = reactive({
      image: [],
      video: [],
      imageProcedure: [],
      videoProcedure: [],
    });
    const list = reactive({
      imageList1: [],
      videoList1: [],
      imageList2: [],
      videoList2: [],
      imageList3: [],
      videoList3: [],
      imageList4: [],
      videoList4: [],
    });

    const formRef = ref();
    const formState = reactive({
      name: '',
      disease_id: '',
      consultation: '暂无描述',
      examination: '暂无描述',
      diagnosis: '暂无描述',
      treatment: '暂无描述',
    });
    const rules = {
      name: [{ required: true, message: '请输入病例名称', trigger: 'change' }],
      disease: [{ required: true,
        validator: (rule, value, callback) => {
          if (formState.disease_id === '') {
            return Promise.reject('请选择病种');
          } else {
            return Promise.resolve();
          }
        }, trigger: 'change' }],
      consultation: [{ required: true, message: '请输入接诊描述', trigger: 'change' }],
      examination: [{ required: true, message: '请输入病例检查描述', trigger: 'change' }],
      diagnosis: [{ required: true, message: '请输入诊断结果描述', trigger: 'change' }],
      treatment: [{ required: true, message: '请输入治疗方案描述', trigger: 'change' }],
    };

    const onSubmit = () => {

      formRef.value
          .validate()
          .then(() => {
            // beforeSubmit();
            let formData = new FormData();
            formData.append('name', formState.name);
            formData.append('disease_id', formState.disease_id);
            formData.append('consultation', formState.consultation);
            formData.append('examination', formState.examination);
            formData.append('diagnosis', formState.diagnosis);

            axios.post('/case/create', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then(res => {
              message.success(`创建病例成功！`);
              router.go(-1);
            });
          })
          .catch(error => {
            console.log('error', error);
          });
    };
    const beforeSubmit = () => {
      state.image.length = 0;
      state.video.length = 0;
      state.imageProcedure.length = 0;
      state.videoProcedure.length = 0;
      state.image.push(...list.imageList1);
      for (let i = 0; i < list.imageList1.length; i++) {
        state.imageProcedure.push('consultation');
      }
      state.image.push(...list.imageList2);
      for (let i = 0; i < list.imageList2.length; i++) {
        state.imageProcedure.push('examination');
      }
      state.image.push(...list.imageList3);
      for (let i = 0; i < list.imageList3.length; i++) {
        state.imageProcedure.push('diagnosis');
      }
      state.image.push(...list.imageList4);
      for (let i = 0; i < list.imageList4.length; i++) {
        state.imageProcedure.push('treatment');
      }
      state.video.push(...list.videoList1);
      for (let i = 0; i < list.videoList1.length; i++) {
        state.videoProcedure.push('consultation');
      }
      state.video.push(...list.videoList2);
      for (let i = 0; i < list.videoList2.length; i++) {
        state.videoProcedure.push('examination');
      }
      state.video.push(...list.videoList3);
      for (let i = 0; i < list.videoList3.length; i++) {
        state.videoProcedure.push('diagnosis');
      }
      state.video.push(...list.videoList4);
      for (let i = 0; i < list.videoList4.length; i++) {
        state.videoProcedure.push('treatment');
      }
      console.log(state);
    };
    return {
      layout,
      state,
      list,
      formRef,
      rules,
      formState,
      onSubmit,
      beforeSubmit,
    };
  }
});
</script>

<style scoped>

</style>