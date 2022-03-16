<template>
  <div class="d-flex flex-column h-100">
    <slot/>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import AppRepository from '~/repositories/AppRepository'
import { Prop, Vue } from 'vue-property-decorator'

@Component({
  head () {
    const app = new AppRepository(this as any)
    return {
      title: app.docMeta.title
    }
  }
})
export default class Container extends Vue {
  @Prop(String) readonly className!: string
}
</script>

<style lang="scss" scoped>
</style>
