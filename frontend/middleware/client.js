export default async ({store, redirect, next}) => {
    await store.dispatch('nuxtClientInit');

    if (!store.getters['auth/check'] || !store.getters['auth/user'].is.some(val => val === 'client')) {
        return redirect('/')
    }

    return next;
}
