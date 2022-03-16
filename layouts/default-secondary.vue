<template>
  <Container>
    <Header/>
    <div class="content">
      <PageHeader
        backgroundType="secondary"/>
      <div class="container py-6 h-100">
        <nuxt/>
      </div>
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
import PageHeader from "~/layouts/components/PageHeader.vue";

@Component({
  components: {PageHeader, Footer, Header, Container},
})
export default class App extends BaseApp {
}
</script>
