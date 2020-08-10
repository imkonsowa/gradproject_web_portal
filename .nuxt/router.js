import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6c2d1b07 = () => interopDefault(import('..\\frontend\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _357103f4 = () => interopDefault(import('..\\frontend\\pages\\admin\\admin_dashboard_page.vue' /* webpackChunkName: "pages/admin/admin_dashboard_page" */))
const _453f0f96 = () => interopDefault(import('..\\frontend\\pages\\admin\\admin_employees_page.vue' /* webpackChunkName: "pages/admin/admin_employees_page" */))
const _22cc2a63 = () => interopDefault(import('..\\frontend\\pages\\admin\\admin_security_cameras_page.vue' /* webpackChunkName: "pages/admin/admin_security_cameras_page" */))
const _671c5924 = () => interopDefault(import('..\\frontend\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _3a95b63f = () => interopDefault(import('..\\frontend\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _6c2d1b07,
    name: "inspire"
  }, {
    path: "/admin/admin_dashboard_page",
    component: _357103f4,
    name: "admin-admin_dashboard_page"
  }, {
    path: "/admin/admin_employees_page",
    component: _453f0f96,
    name: "admin-admin_employees_page"
  }, {
    path: "/admin/admin_security_cameras_page",
    component: _22cc2a63,
    name: "admin-admin_security_cameras_page"
  }, {
    path: "/auth/login",
    component: _671c5924,
    name: "auth-login"
  }, {
    path: "/",
    component: _3a95b63f,
    name: "index"
  }, {
    path: "/login",
    component: _671c5924,
    name: "login"
  }, {
    path: "/admin/employees",
    component: _453f0f96,
    name: "admin.employees"
  }, {
    path: "/admin/security-cameras",
    component: _22cc2a63,
    name: "admin.security.cameras"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
