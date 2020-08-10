export default ({ $axios, app, store, redirect, router }) => {
    $axios.defaults.withCredentials = true;
    $axios.defaults.proxyHeaders = true;

    window.axios = $axios;

    $axios.interceptors.request.use((request) => {
        request.headers.common['Content-Type'] = 'application/json';
        request.headers.common['Accept'] = 'application/json';

        if (window.echo && window.echo.socketId()) {
            request.headers.common['X-Socket-Id'] = window.echo.socketId();
        }

        return request
    });


    // Request interceptor
    /*$axios.interceptors.response.use((response) => {
        const {status} = response || {};

        if (status === 200 && response.data.message && response.data?.silent === false) {
            store.dispatch('front/viewSnackbar', {value: true, text: response.data.message})
        }

        return Promise.resolve(response)

    }, (error) => {
        const {status} = error.response || {};

        if (status === 500 || status === 422 && (error.response.data.message && error.response.data?.silent === false)) {
            store.dispatch('front/viewSnackbar', {
                value: true,
                text: error.response.data.message || 'Something went wrong'
            })
        }

        if (status === 401) {
            store.commit('auth/LOGOUT', {}, {root: true})
        }

        if ((status === 419 && process.client && store.getters['auth/check']) || status === 401) {
            store.commit('auth/LOGOUT', {}, {root: true})
            store.commit('auth/FETCH_USER_FAILURE', {}, {root: true})
        }

        return Promise.reject(error)
    })*/
}
