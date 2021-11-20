import { resolve } from 'path';
import * as FontAwesome from './src/plugins/icon/fontawesome'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'khuvid-web-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true },
    ],
  },
  srcDir: 'src/',
  ssr: false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    resolve(__dirname, 'src/assets/styles/css/tailwind.css'),
    resolve(__dirname, 'src/assets/styles/scss/index.scss'),
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/chartJs/index', mode: 'client' },
    { src: '@/plugins/calendar/vCalendar.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    // '@nuxtjs/auth',
    'cookie-universal-nuxt',
  ],
  auth: {
    strategies: {
      google: {
        clientId: '442366876413-4a1q3lpghs2rc3pqeeg6fnqfp4cn1frk.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: ['token', 'id_token'],
        // responseType: 'code',
        // scope: ['profile', 'email'],
      },
      // social: {
      //   scheme: 'oauth2',
      //   endpoints: {
      //     authorization: 'https://accounts.google.com/o/oauth2/auth',
      //     token: 'https://oauth2.googleapis.com/token',
      //     userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
      //     deviceAuthorization: 'https://oauth2.googleapis.com/device/code',
      //   },
      //   token: {
      //     property: 'access_token',
      //     type: 'Bearer',
      //     maxAge: 1800,
      //   },
      //   refreshToken: {
      //     property: 'refresh_token',
      //     maxAge: 60 * 60 * 24 * 30,
      //   },
      //   responseType: ['token', 'id_token'],
      //   grantType: 'authorization_code',
      //   accessType: undefined,
      //   redirectUri: 'http://localhost:3000/main',
      //   // logoutRedirectUri: 'http://localhost:3000/main',
      //   clientId: '442366876413-4a1q3lpghs2rc3pqeeg6fnqfp4cn1frk.apps.googleusercontent.com',
      //   scope: ['openid', 'profile', 'email'],
      //   state: 'UNIQUE_AND_NON_GUESSABLE',
      //   codeChallengeMethod: '',
      //   responseMode: '',
      //   acrValues: '',
      // },
    },
    redirect: {
      login: '/main',
      logout: '/main',
      callback: '/main',
      home: '/main',
    },
  },
  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands,
    },
    component: 'fa',
    suffix: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    'nuxt-client-init-module',
  ],
  alias: {
    '@': resolve(__dirname, './src'),
    images: resolve(__dirname, './src/assets/images'),
    styles: resolve(__dirname, './src/assets/styles'),
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/api/v1': { target: 'https://nip.kdca.go.kr', pathRewrite: { '^/api/v1': '' } },
    '/api/v2': { target: 'http://125.130.125.108:20505', pathRewrite: { '^/api/v2': ''} },
  },
}
