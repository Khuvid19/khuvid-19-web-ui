import { resolve } from 'path';
import * as FontAwesome from './src/plugins/icon/fontawesome';
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
      { name: 'google', content: 'notranslate' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true }],
  },
  loading: false,
  srcDir: 'src/',
  ssr: false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    resolve(__dirname, 'src/assets/styles/css/tailwind.css'),
    resolve(__dirname, 'src/assets/styles/scss/index.scss'),
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    { src: '@/plugins/chartJs/index', mode: 'client' },
    { src: '@/plugins/calendar/vCalendar.js', ssr: false },
    { src: '@/plugins/mixins.js' },
    { src: '@/plugins/infinite-loading.js', ssr: false },
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
        clientId:
          '442366876413-4a1q3lpghs2rc3pqeeg6fnqfp4cn1frk.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: ['token', 'id_token'],
      },
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
  manifest: {
    name: 'KHUVID-19',
    short_name: 'KHUVID-19',
    start_url: '/main',
    display: 'standalone',
    background_color: '#000',
  },
  workbox: {
    offline: false,
    runtimeCaching: [
      {
        urlPattern: '/*',
        handler: 'networkFirst',
        method: 'GET',
      },
    ],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    'nuxt-client-init-module',
    '@nuxtjs/dayjs',
    '@nuxtjs/pwa',
  ],
  alias: {
    '@': resolve(__dirname, './src'),
    images: resolve(__dirname, './src/assets/images'),
    styles: resolve(__dirname, './src/assets/styles'),
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'http://125.130.125.108:20505/',
  },
  proxy: {
    '/api/v1': {
      target: 'https://nip.kdca.go.kr',
      pathRewrite: { '^/api/v1': '' },
    },
    '/api/v2': {
      target: 'http://125.130.125.108:20505',
      pathRewrite: { '^/api/v2': '' },
    },
  },
};
