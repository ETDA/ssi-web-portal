import { NuxtConfig } from '@nuxt/types'

require('dotenv').config()

const config: NuxtConfig = {
  server: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 8000 // default: 3000
  },
  ssr: true,
  components: false,
  env: {
    APP_BASE_API: process.env.APP_BASE_API || '',
    APP_PREFIX: process.env.APP_PREFIX || ''
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'ETDA e-Portal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no' },
      { name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/jquery/dist/jquery.min.js', body: true },
      { src: '/js/jquery-migrate/dist/jquery-migrate.min.js', body: true },
      { src: '/js/bootstrap/dist/js/bootstrap.bundle.min.js', body: true },
      { src: '/js/hs-navbar-vertical-aside/hs-navbar-vertical-aside.min.js', body: true },
      { src: '/js/hs-unfold/dist/hs-unfold.min.js', body: true },
      { src: '/js/hs-form-search/dist/hs-form-search.min.js', body: true },
      { src: '/js/theme.min.js', body: true }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/_template/icon-set/style.css',
    '@/assets/theme.scss',
    'bootstrap-vue/dist/bootstrap-vue.css',
    'vue-multiselect/dist/vue-multiselect.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/ssr', ssr: true },
    { src: '~/plugins/client', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    ['@nuxt/typescript-build', { typeCheck: false }],
    '@nuxtjs/composition-api/module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'cookie-universal-nuxt',
    'nuxt-vuex-router-sync'
  ],

  sentry: {
    dsn: process.env.APP_SENTRY_DSN,
    config: {} // Additional config
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        cacheGroups: {},
        minSize: 100000,
        maxSize: 100000
      }
    },
    // @ts-ignore
    maxChunkSize: 100000,
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
    }
  },

  router: {
    base: process.env.APP_PREFIX ? `/${process.env.APP_PREFIX}/` : '',
    middleware: ['route']
  }
}

export default config
