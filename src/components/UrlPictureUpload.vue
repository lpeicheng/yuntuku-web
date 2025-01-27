<script setup lang="ts">
import { message } from 'ant-design-vue'
import { uploadPictureByUrlUsingPost } from '@/api/pictureController.ts'
import _default from 'ant-design-vue/es/vc-slick/inner-slider'
import { ref } from 'vue'

const loading = ref<boolean>(false)
const fileUrl = ref<string>()
const props = defineProps<Props>()
interface Props {
  picture?: API.PictureVO
  spaceId?: number
  onSuccess?: (newPicture: API.PictureVO) => void
}
/**
 * 上传
 */
const handleUpload = async () => {
  loading.value = true
  try {
    const params: API.PictureUploadRequest = { fileUrl: fileUrl.value }
    params.spaceId = props.spaceId;
    if (props.picture) {
      params.id = props.picture.id
    }
    const res = await uploadPictureByUrlUsingPost(params)
    if (res.data.code === 0 && res.data.data) {
      message.success('图片上传成功')
      // 将上传成功的图片信息传递给父组件
      props.onSuccess?.(res.data.data)
    } else {
      message.error('图片上传失败，' + res.data.message)
    }
  } catch (error) {
    message.error('图片上传失败')
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="url-picture-upload">
    <a-input-group compact style="margin-bottom: 16px">
      <a-input v-model:value="fileUrl" style="width: calc(100% - 120px)" placeholder="请输入图片 URL" />
      <a-button type="primary" :loading="loading" @click="handleUpload" style="width: 120px">提交</a-button>
    </a-input-group>
    <img v-if="picture?.url" :src="picture?.url" alt="avatar" style="max-width: 700px;max-height: 600px"/>
  </div>

</template>

<style scoped>

</style>
