<template>
  <div>
    <Container v-if="error.statusCode === 404" className="side-trans-enabled">
      <main id="main-container">
        <div class="bg-image">
          <div class="hero bg-white-50">
            <div class="hero-inner">
              <div class="content content-full">
                <div class="px-3 py-5 text-center">
                  <div class="row js-appear-enabled" data-toggle="appear">
                    <div class="col-sm-6 text-center text-sm-right">
                      <div class="display-1 text-danger font-w700">404</div>
                    </div>
                    <div class="col-sm-6 text-center d-sm-flex align-items-sm-center">
                      <div class="display-1 text-muted font-w300">Error</div>
                    </div>
                  </div>
                  <h1 class="h2 font-w700 mt-5 mb-3 js-appear-enabled animated fadeInUp" data-class="animated fadeInUp"
                      data-timeout="300" data-toggle="appear">Oops.. You just found an error page..</h1>
                  <h2 class="h3 font-w400 text-muted mb-5 js-appear-enabled animated fadeInUp"
                      data-class="animated fadeInUp"
                      data-timeout="450" data-toggle="appear">We are sorry but the page you are looking for
                    was not found..</h2>
                  <div class="js-appear-enabled animated fadeInUp" data-class="animated fadeInUp" data-timeout="600"
                       data-toggle="appear">
                    <nuxt-link class="btn btn-primary" to="/">
                      <i class="fa fa-arrow-left mr-1"></i> กลับสู่หน้าหลัก
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
    <Container v-else className="side-trans-enabled">
      <main id="main-container">
        <div class="bg-image">
          <div class="hero bg-gd-sublime-op align-items-sm-end">
            <div class="hero-inner">
              <div class="content content-full">
                <div class="px-3 py-5 text-center text-sm-right">
                  <div class="display-1 text-black font-w300">500</div>
                  <h1 class="h2 font-w700 text-white mt-5 mb-3">Oops.. You just found an error page..</h1>
                  <h2 class="h3 font-w400 text-white-75 mb-5">We are sorry but your request contains bad syntax and
                    cannot be fulfilled..</h2>
                  <nuxt-link class="btn btn-primary" to="/">
                    <i class="fa fa-arrow-left mr-1"></i> กลับสู่หน้าหลัก
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  </div>
</template>

<script>
import Container from './components/Container'

export default {
  components: { Container },
  props: ['error']
}
</script>
