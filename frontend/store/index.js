
export const actions = {
    async nuxtClientInit({commit, rootGetters, dispatch}) {

        try {
            if (!rootGetters['auth/check']) {
                await this.$axios.get('user', {
                    withCredentials: true,
                    progress: false
                }).then(response => {
                    commit('auth/FETCH_USER_SUCCESS', response.data, {root: true})
                }).catch(error => {
                    commit('auth/LOGOUT', {}, {root: true})
                    commit('auth/FETCH_USER_FAILURE', {}, {root: true})
                })
                    .finally(() => {
                    })
            }

        } catch (e) {
            commit('auth/LOGOUT', {}, {root: true})
            commit('auth/FETCH_USER_FAILURE', {}, {root: true})
        }
    }
};
