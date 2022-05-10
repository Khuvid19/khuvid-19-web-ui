import { resolve } from 'path';
import * as FontAwesome from './src/plugins/icon/fontawesome';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KHUVID-19',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'KHUVID는 코로나 19 백신 접종 후기 플랫폼입니다.',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'KHUVID-19',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'KHUVID는 코로나 19 백신 접종 후기 플랫폼입니다.',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'article',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'http://125.130.125.108.nip.io:20502/',
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.png',
    }],
    script: [{
      hid: 'stripe',
      src: 'https://js.stripe.com/v3/',
      defer: true,
    }],
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
    {
      src: '@/plugins/chartJs/index',
      mode: 'client',
    },
    {
      src: '@/plugins/calendar/vCalendar.js',
      ssr: false,
    },
    { src: '@/plugins/mixins.js' },
    {
      src: '@/plugins/infinite-loading.js',
      ssr: false,
    },
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
          '696110534823-vs99c6j41lhailde2dprfp6ae7b442kf.apps.googleusercontent.com',
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
    background_color: '#fff',
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
