export default async ({ store, route }) => {
    if (/*route.meta && route.meta[0].requiresAuth && */!store.getters['auth/check']) {
        await store.dispatch('auth/fetchUser')
    }
}
