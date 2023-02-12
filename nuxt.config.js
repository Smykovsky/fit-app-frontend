
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [

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
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: "~/plugins/fontawesome.js", ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/router',
    '@nuxtjs/auth-next'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-vuex-localstorage'
  ],
  components: true,

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: process.env.API_URL
  },

  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      ws: true,
      changeOrigin: true
    },
    '/auth': {
      target: 'http://localhost:8080',
      ws: true,
      changeOrigin: true
    }
  },

  auth: {
    redirect:{
      login: '/login',
      logout: '/',
      callback: '/login',
      home: 'main'
    },
    scopeKey: 'roles',
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          required: true,
          maxAge: 1800,
          global: false,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refreshToken',
          maxAge: 60*60*24*30
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          register: { url: '/auth/register', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          refresh: { url: '/auth/refresh', method: 'post' }
        }
      }
    }
  },

  router: {

  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
