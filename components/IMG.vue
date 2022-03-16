<template>
  <VueImgTag :errorImg="errorImage" :loadingImg="loadingImage"
             :src="src" :style="`width: ${width} !important;height: ${height} !important`" class="rounded"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import VueImgTag from 'vue-img-tag'
import {Base} from '../core/Base'

const imgBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFxgVGBUXFxcYFxcaFRoXFxUXFRgaHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAIBABAQEAAgICAwEAAAAAAAAAABEBAvAhMUGxEoHhwf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDtUUUAMAUQBQACBAQAAACIsAAABFBFQgKIsAEAVAoJ+ODXgBF+0AUqLQVMCgoICkAEAAAACACKgKhoBSAAQAAABFBRKoIABVABagAoAaAAACCoAAAVAFQKAAAF7/AAAAAD8u9wS98gKIoGaqKAACgAAAAaBUVAAAEUgILiAGgBoqAAUAAEoUAVMUBUXAMABQACgBoAIAAigAAAACKAkFATRUAgAHkJqgzipgC1UAXBFAVIoAAAACAABQAoAAABgAAAIBuAAv4hAGcKFBYEAUxFAIALRFABAUQAKAAAAAFCgFAARQEFQDwqUBMKKCZimYAL6SGAoYAVUAWiAKioAUAAAAgAAAAAACKIArNUEUoABnfQCooBhAAMANVF0EFQAAAACAABAAgAAAIqQFEnZqggAGi1APoFAgAGCoCosQAACgAAAAAAAAAFABCgKEAQUBFEBUxUBQIAAACggAEAAIAIugAQACACKACaALMAAEqgCAKJqgGBQFQAVAAAEWgCAUFQUAAAAAAEVABUvfKggHe+QBUgAAC4gC0QBSooCKAgAAAAAKAAAAAAACeVSKCYYzn6awAzVNARQEUAMAAA0EFQAAAAAwwAqwAAAAAAASd8qnhQOPynfsATj6Tj8gDfH2fAAus761QF1nj/AKAHL3+jh6UBMN9/pQE5LyAEw4/KgM8veHP0ALhxADj7NUBdTn8AC8k4gCAA/9k='

@Component({
  components: { VueImgTag }
})
export default class IMG extends Base {
  @Prop({ default: () => imgBase64 }) readonly loadingImage!: string
  @Prop({ default: '' }) readonly errorImage!: string
  @Prop() readonly src!: string
  @Prop({ default: 'auto' }) readonly width!: string
  @Prop({ default: 'auto' }) readonly height!: string
}
</script>

<style lang="scss">
.wrap {
  display: block !important;
  width: auto !important;
  line-height: 0 !important;

  img {
    max-width: 100%;
    max-height: 100%;
    width: 100% !important;
    height: auto !important;
  }
}
</style>
