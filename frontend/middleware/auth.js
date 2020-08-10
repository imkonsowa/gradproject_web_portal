export default async ({ store, redirect }) => {
    await store.dispatch('nuxtClientInit');

    if (!store.getters['auth/check']) {
        return redirect('/login')
    }
}

