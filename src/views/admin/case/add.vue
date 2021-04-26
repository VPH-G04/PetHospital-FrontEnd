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
            <a-tab-pane key="1" tab="接诊">
              <a-form-item name="consultation" label="描述">
                <a-textarea
                    v-model:value="formState.consultation"
                    placeholder="请输入描述文字"
                    auto-size
                />
              </a-form-item>
              <a-form-item name="image" label="图片">
                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    v-model:file-list="imageList"
                    @preview="handlePreview"
                >
                  <div v-if="imageList.length < 8">
                    <plus-outlined />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>

<!--                <a-upload-->
<!--                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"-->
<!--                    list-type="picture"-->
<!--                    v-model:file-list="imageList"-->
<!--                >-->
<!--                  <a-button>-->
<!--                    <upload-outlined></upload-outlined>-->
<!--                    upload-->
<!--                  </a-button>-->
<!--                </a-upload>-->
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
import useUserStore from "@/hooks/useUserStore";
import {useRouter} from "vue-router";
import axios from "@/utils/axios";
import {message} from "ant-design-vue";
import AdminMenu from "@/components/Header/AdminMenu";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};
export default defineComponent({
  components: {AdminMenu, UploadOutlined, PlusOutlined},
  data() {
    return {
      paperList: [
        {"id": 1, "name": "试卷一"},
      ],
      options: [],
      diseaseId: [],
      imageList: [],
      videoList: [],
    }
  },
  methods: {
    onSelectChange(val) {
      this.formState.disease_id = this.diseaseId[1];
    },

  },
  created() {
    this.options = JSON.parse(localStorage.getItem('diseaseOptions'));
  },
  setup(props, ctx) {
    const router = useRouter();

    const formRef = ref();
    const formState = reactive({
      name: '',
      disease_id: '',
      consultation: '',
      examination: '',
      diagnosis: '',
      treatment: '',
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
    };

    const previewVisible = ref(false);
    const previewImage = ref('');
    const handleCancel = () => {
      previewVisible.value = false;
    };
    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };

    const handleChange = ({ fileList: newFileList }) => {
      ctx.imageList = newFileList;
    };

    const onSubmit = () => {
      formRef.value
          .validate()
          .then(() => {
            axios.post('/test/createTest', formState).then(res => {
              message.success(`创建考试成功！`);
              router.go(-1);
            });
          })
          .catch(error => {
            console.log('error', error);
          });
    };
    return {
      layout,
      formRef,
      rules,
      formState,
      previewVisible,
      previewImage,
      handleCancel,
      handlePreview,
      handleChange,
      onSubmit,
    };
  }
});
</script>

<style scoped>

</style>