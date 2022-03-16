<template>
  <Container>
    <Header/>
    <div class="content">
      <nuxt/>
    </div>
    <Footer/>
  </Container>
</template>
<script lang="ts">
import {Component} from 'vue-property-decorator'
import {BaseApp} from '~/core/Base'
import Container from "~/layouts/components/Container.vue";
import Header from "~/layouts/components/Header.vue";
import Footer from "~/layouts/components/Footer.vue";

@Component({
  components: {Footer, Header, Container}
})
export default class App extends BaseApp {
}
</script>
