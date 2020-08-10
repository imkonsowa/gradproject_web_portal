export { default as Logo } from '../..\\frontend\\components\\Logo.vue'
export { default as VuetifyLogo } from '../..\\frontend\\components\\VuetifyLogo.vue'

export const LazyLogo = import('../..\\frontend\\components\\Logo.vue' /* webpackChunkName: "components_Logo'}" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../..\\frontend\\components\\VuetifyLogo.vue' /* webpackChunkName: "components_VuetifyLogo'}" */).then(c => c.default || c)
