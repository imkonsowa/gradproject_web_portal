export default async ({ store, redirect, next }) => {
    await store.dispatch('nuxtClientInit');

    if (!store.getters['auth/check'] || !store.getters['auth/user'].is.some(val => val === 'admin')) {
        return redirect('/')
    }

    return next;
}
