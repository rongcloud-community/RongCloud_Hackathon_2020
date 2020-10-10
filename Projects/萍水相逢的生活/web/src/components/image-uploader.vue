<template>
  <div @click="selectImage">
    <input ref="imageSelect" v-show="false"
                              type='file' accept="image/*;capture=camera" 
                                          @change="handleImageChange">
    <slot />
  </div>
</template>

<script>
import { handleUploadImageEvent } from '@/js/image-utils'

export default {
  name: 'ImageUploader',
  methods: {
    selectImage () {
      this.$refs.imageSelect.click()
    },
    handleImageChange (event) {
      handleUploadImageEvent(event, remoteImage => {
        this.$emit("uploaded", remoteImage)
      })
    }
  }
}
</script>
