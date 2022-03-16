<template>
  <Card
      class="h-100"
      bodyClassName="card-body h-100">
    <div class="d-flex flex-column h-100">
      <div class="row mx-0 mb-3">
        <div class="col-4">
          <img class="h-100" :src="`/icons/${icon}.svg`" alt="">
        </div>
        <div class="col-8 d-flex flex-column">
          <h4>{{ title }}</h4>
          <p>
            {{ description }}
          </p>
        </div>
      </div>
      <PrimaryButton
          @click="onClick"
          className="mt-auto"
          :name="buttonText"/>
    </div>
  </Card>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import PrimaryButton from "~/containers/PrimaryButton.vue";

interface Props {
  icon: string
  title: string
  description: string
  buttonText: string
}

export default defineComponent<Props>({
  components: {PrimaryButton},
  props: {
    icon: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    buttonText: {
      required: true,
      type: String,
    },
  },
  setup(props: Props, context) {
    return {
      onClick: () => {
        context.emit('click')
      },
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
