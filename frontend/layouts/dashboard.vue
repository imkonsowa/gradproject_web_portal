<template>
    <v-app>
        <v-navigation-drawer
            dark
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        </v-app-bar>
        <v-main>
            <v-container>
                <nuxt/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: "dashboard",
        middleware: ['auth'],
        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                items: [
                    {
                        icon: 'people',
                        title: 'Employees',
                        to: '/admin/employees'
                    },
                    {
                        icon: 'security',
                        title: 'Security Cameras',
                        to: '/admin/security-cameras'
                    },
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js'
            }
        }
    }
</script>

<style scoped>

</style>
