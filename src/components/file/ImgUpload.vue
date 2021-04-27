<template>
  <a-upload
      action="/api/case/upload"

      list-type="picture-card"
      v-model:file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
  >
<!--  <a-upload-->
<!--      :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload"-->
<!--      list-type="picture-card"-->
<!--      @preview="handlePreview"-->
<!--  >-->
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
import {Modal} from "ant-design-vue";

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
      // if (!file.url && !file.preview) {
      //   file.preview = await getBase64(file.originFileObj);
      // }
      // previewImage.value = file.url || file.preview;

      previewImage.value = file.url || file.thumbUrl;
      previewVisible.value = true;
    };

    const handleRemove = file => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
      emit("change", fileList, props.procedure);
    };

    const beforeUpload = file => {
      const isJPG = file.type === 'image/jpeg';
      const isJPEG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      if (!(isJPG || isJPEG || isGIF || isPNG)) {
        Modal.error({
          title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片!',
        });
        return;
      }
      const sizeLimit = file.size / 1024 / 1024 < 5;
      if (!sizeLimit) {
        Modal.error({
          title: '超过5M限制，不允许上传~',
        });
        return;
      }
      return (isJPG || isJPEG || isGIF || isPNG) && sizeLimit;
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
      handleRemove,
      beforeUpload,
      handlePreview,
      handleChange,
    };
  }
});
</script>

<style scoped>

</style>