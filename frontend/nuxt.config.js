require('dotenv').config();
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const colors = require('vuetify/es5/util/colors').default;

const {join} = require('path');
const {copySync, removeSync} = require('fs-extra');

export default {
    mode: 'spa',

    srcDir: __dirname,

    env: {
        apiUrl: process.env.API_URL,
        appUrl: process.env.APP_URL,
        appName: process.env.APP_NAME,
        appLocale: process.env.APP_LOCALE || 'en',
        githubAuth: !!process.env.GITHUB_CLIENT_ID,
        pusherAppID: '866642',
        pusherAppKey: '9067c7ddd627b0b528c3',
        pusherAppSecret: 'ebabf9ee787a5d829b19',
        pusherCluster: 'eu',
        webSocketsHost: process.env.WEB_SOCKETS_HOST,
        primaryColor: process.env.PRIMARY_COLOR
    },

    /*server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
    },*/

    target: 'static',

    head: {
        titleTemplate: '%s - ' + 'Grad Project',
        title: 'Grad Project' || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    css: [
        {src: '~assets/app.scss', lang: 'scss'},
    ],

    plugins: [
        '~plugins/vuelidate',
        '~plugins/axios',
        { src: '~plugins/jquery-datatables.js', ssr: false },

    ],

    components: true,

    buildModules: [
        '@nuxtjs/vuetify',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt/content
        '@nuxt/content',
    ],

    axios: {
        baseUrl: process.env.apiUrl
    },

    content: {},

    vuetify: {
        customVariables: ['~/assets/variables.scss'],
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

    build: {
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            })
        },
        plugins: [
            new webpack.ProvidePlugin({
                '_': 'lodash',
                '$': 'jquery'
            })
        ]
    },

    hooks: {
        generate: {
            done(generator) {
                // Copy dist files to public/_nuxt
                if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === 'spa') {
                    const publicDir = join(generator.nuxt.options.rootDir, 'public', '_nuxt');
                    removeSync(publicDir);
                    copySync(join(generator.nuxt.options.generate.dir, '_nuxt'), publicDir);
                    copySync(join(generator.nuxt.options.generate.dir, '200.html'), join(publicDir, 'index.html'))
                }
            }
        }
    },

    router: {
        extendRoutes(routes, resolve) {
            [
                {path: '/login', name: 'login', component: resolve(__dirname, 'pages/auth/login.vue')},
                {
                    path: '/admin/employees',
                    component: resolve(__dirname, 'pages/admin/admin_employees_page.vue'),
                    name: 'admin.employees'
                },
                {
                    path: '/admin/security-cameras',
                    component: resolve(__dirname, 'pages/admin/admin_security_cameras_page.vue'),
                    name: 'admin.security.cameras'
                }
            ].map(route => routes.push(route))
        }
    }
}
