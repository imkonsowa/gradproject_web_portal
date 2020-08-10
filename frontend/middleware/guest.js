export default ({ store, redirect }) => {
    let user = store.getters['auth/user']

    if (user.is.some(val => val === 'admin')) {
        return redirect('/admin')
    } else {
        return redirect('/')
    }
}
