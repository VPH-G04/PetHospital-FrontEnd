<template>
  <a-upload
      :beforeUpload="()=>false"
      list-type="picture-card"
      v-model:file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
  >
    <div v-if="fileList.length < 8">
      <plus-outlined />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
  <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import {PlusOutlined, UploadOutlined} from '@ant-design/icons-vue';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default defineComponent ({
  name: "ImgUpload",
  components: {UploadOutlined, PlusOutlined},
  props: {
    procedure: {
      type: String,
      default: 'consultation'
    },
  },
  setup(props, { emit }) {
    const fileList = ref([]);
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

    const handleChange = ({file, fileList, event}) => {
      fileList.value = fileList;
      emit("change", fileList, props.procedure);
    };

    return {
      fileList,
      previewVisible,
      previewImage,
      handleCancel,
      handlePreview,
      handleChange,
    };
  }
});
</script>

<style scoped>

</style>