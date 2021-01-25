import colors from "vuetify/es5/util/colors";
console.log("NECESSARY ENV ENVIRONMENTS");
console.log(process.env.API_KEY);
console.log(process.env.API_URL);
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - MovieApp",
    title: "MovieApp",
    htmlAttrs: {
      lang: "en",
      amp: true
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Movie Preview built with Nuxt Js | Erwin Rahayu"
      },
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "twitter:card",
        property: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "twitter:site",
        property: "twitter:site",
        name: "twitter:site",
        content: "@ErwinRA7"
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: "https://devmovie.netlify.app/"
      },
      {
        hid: "twitter:creator",
        property: "twitter:creator",
        name: "twitter:creator",
        content: "@ErwinRA7"
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Movie Vue - Movie App Preview Built with NUXT Js"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Movie Vue - Movie App Preview Built with NUXT Js"
      },
      {
        hid: "twitter:image:src",
        property: "twitter:image:src",
        content: "/movievue-home-web-erwin-rahayu.png"
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/movievue-home-web-erwin-rahayu.png"
      },
      {
        property: "og:title",
        content: "Movie Vue - Movie App Preview Built with NUXT Js"
      },
      {
        property: "og:site_name",
        content: "Movie Vue - Movie App Preview Built with NUXT Js"
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/movievue-home-web-erwin-rahayu.png" },
      {
        property: "og:description",
        content: "Movie Preview App built with Nuxt Js | Erwin Rahayu"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  env: {
    NUXT_ENV_COOL_WORD: "a default value that can be overridden",
    SOME_OTHER_VALUE: "can't be overridden - missing NUXT_ENV_ prefix",
    CONDITIONAL: process.env.CONDITIONAL || "some default value", //if can't use NUXT_ENV_
    API_KEY: process.env.API_KEY || "e2f3842d3dc69632ce5239805027600e", // Ensure variable reaches the client
    API_URL: process.env.API_URL || "https://api.themoviedb.org/3" // Ensure variable reaches the client
  },
  privateRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/dotenv"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
