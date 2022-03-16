<template>
  <Container>
    <nuxt/>
  </Container>
</template>
<script lang="ts">
import {BaseApp} from '~/core/Base'
import Component from 'vue-class-component'
import Container from "~/layouts/components/Container.vue";

@Component({
  components: {Container}
})
export default class App extends BaseApp {
}
</script>
