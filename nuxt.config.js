export default {
  mode: 'universal',
  target: 'server',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'GEP Eksplorasa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ganesha Exhibition Programme adalah ekshibisi karya kru LFM ITB tahunan yang kali ini membawakan tema Eksplorasa.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/gep.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/scss/main.scss",
    "@/assets/scss/fonts.scss",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
  ],

  router: {
    // ran before every route on both client and server
    // middleware: 'redirect' // ONLY ENABLE IN MASTER BRANCH COMING SOON DEPLOYMENT
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    // '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        },
        services: {
          firestore: true,
          storage: true,
          analytics: true
        }
      }
    ],
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faChevronRight','faChevronLeft', 'faTimes', 'faBookOpen', 'faSearchPlus']
        }
      ]
    }]
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
  },

  generate: {
    fallback: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
