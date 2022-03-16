<template>
  <div class="bg-white rounded-lg shadow link-item h-100 d-flex flex-column p-3">
    <div class="icon w-100 position-relative">
      <img class="position-absolute p-4 h-100 w-100" :src="image" :alt="title">
    </div>
    <div class="title text-primary">
      <h3>{{ title }}</h3>
    </div>
    <div class="description mb-4">
      <p>{{ description }}</p>
    </div>
    <LinkButton
        className="p-3 mt-auto"
        :title="buttonText"
        :to="to"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import LinkButton from '~/containers/LinkButton.vue'

interface Props {
  image: string
  title: string
  description: string
  to: string
  buttonText: string
}

export default defineComponent<Props>({
  components: { LinkButton },
  props: {
    image: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    to: {
      required: true,
      type: String
    },
    buttonText: {
      required: true,
      type: String
    }
  },
  setup (props: Props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
