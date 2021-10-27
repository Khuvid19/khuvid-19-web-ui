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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],
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
  ],
  alias: {
    '@': resolve(__dirname, './src'),
    images: resolve(__dirname, './src/assets/images'),
    styles: resolve(__dirname, './src/assets/styles'),
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
}
