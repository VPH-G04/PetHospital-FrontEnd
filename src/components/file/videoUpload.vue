<template>
  <a-upload
      action="/api/case/upload"
      :multiple="false"
      :file-list="fileList"
      @change="handleChange"
      :remove="handleRemove"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Upload
    </a-button>
  </a-upload>
  <div v-if="done" style="margin: 20px 0">
    <video :src="url" :controls="{controls: true}"></video>
  </div>

</template>
<script>
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UploadOutlined,
  },
  props: {
    procedure: {
      type: String,
      default: 'consultation'
    },
  },
  setup(props, { emit }) {
    const done = ref(false);
    const url = ref('');
    const fileList = ref([
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'http://www.baidu.com/xxx.png',
      // },
    ]);

    const handleChange = info => {
      let resFileList = [...info.fileList]; // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new

      resFileList = resFileList.slice(-2); // 2. read from response and show file link

      resFileList = resFileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data;
          console.log(file.url);
          url.value = file.url;
          done.value = true;
        }

        return file;
      });
      fileList.value = resFileList;
      emit("change", fileList, props.procedure);
    };

    const handleRemove = file => {
     done.value = false;
     url.value = '';
    };

    return {
      done,
      url,
      fileList,
      handleChange,
      handleRemove
    };
  },
});
</script>