import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\frontend\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_4ff4e9fc from 'nuxt_plugin_plugin_4ff4e9fc' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_workbox_6ca07201 from 'nuxt_plugin_workbox_6ca07201' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_4cfc737a from 'nuxt_plugin_nuxticons_4cfc737a' // Source: .\\nuxt-icons.js (mode: 'all')
import nuxt_plugin_plugin_667be032 from 'nuxt_plugin_plugin_667be032' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_pluginclient_7bc59ab8 from 'nuxt_plugin_pluginclient_7bc59ab8' // Source: .\\content\\plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_3d01e780 from 'nuxt_plugin_pluginserver_3d01e780' // Source: .\\content\\plugin.server.js (mode: 'server')
import nuxt_plugin_axios_47f81bb6 from 'nuxt_plugin_axios_47f81bb6' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_vuelidate_1613848c from 'nuxt_plugin_vuelidate_1613848c' // Source: ..\\frontend\\plugins\\vuelidate (mode: 'all')
import nuxt_plugin_axios_fb9c9a02 from 'nuxt_plugin_axios_fb9c9a02' // Source: ..\\frontend\\plugins\\axios (mode: 'all')
import nuxt_plugin_jquerydatatables_59155a70 from 'nuxt_plugin_jquerydatatables_59155a70' // Source: ..\\frontend\\plugins\\jquery-datatables.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"%s - Grad Project","title":"Grad Project","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"\u003Cp align=\"center\"\u003E\u003Cimg src=\"https:\u002F\u002Fres.cloudinary.com\u002Fdtfbvvkyp\u002Fimage\u002Fupload\u002Fv1566331377\u002Flaravel-logolockup-cmyk-red.svg\" width=\"400\"\u003E\u003C\u002Fp\u003E"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"gradproject_frontend"},{"hid":"theme-color","name":"theme-color","content":"black"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"gradproject_frontend"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"gradproject_frontend"},{"hid":"og:description","name":"og:description","property":"og:description","content":"\u003Cp align=\"center\"\u003E\u003Cimg src=\"https:\u002F\u002Fres.cloudinary.com\u002Fdtfbvvkyp\u002Fimage\u002Fupload\u002Fv1566331377\u002Flaravel-logolockup-cmyk-red.svg\" width=\"400\"\u003E\u003C\u002Fp\u003E"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.0013281b.json"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_4ff4e9fc === 'function') {
    await nuxt_plugin_plugin_4ff4e9fc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_6ca07201 === 'function') {
    await nuxt_plugin_workbox_6ca07201(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_4cfc737a === 'function') {
    await nuxt_plugin_nuxticons_4cfc737a(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_667be032 === 'function') {
    await nuxt_plugin_plugin_667be032(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_7bc59ab8 === 'function') {
    await nuxt_plugin_pluginclient_7bc59ab8(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_3d01e780 === 'function') {
    await nuxt_plugin_pluginserver_3d01e780(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_47f81bb6 === 'function') {
    await nuxt_plugin_axios_47f81bb6(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_1613848c === 'function') {
    await nuxt_plugin_vuelidate_1613848c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_fb9c9a02 === 'function') {
    await nuxt_plugin_axios_fb9c9a02(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_jquerydatatables_59155a70 === 'function') {
    await nuxt_plugin_jquerydatatables_59155a70(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
