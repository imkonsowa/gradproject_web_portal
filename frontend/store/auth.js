
export const state = () => ({
    user: null,
});

export const getters = {
    user: state => state.user,
    check: state => state.user !== null,
    prefix: state => ['admin', 'client', 'agent'].filter(r => state.user?.is.includes(r))[0] ?? ''
};

export const mutations = {
    FETCH_USER_SUCCESS (state, user) {
        state.user = user
    },
    FETCH_USER_FAILURE (state) {
        state.user = null
    },
    LOGOUT (state) {
        state.user = null;
    },
    UPDATE_USER (state, { user }) {
        state.user = user
    }
};

// actions
export const actions = {
    async fetchUser ({ commit }) {
        try {
            const { data } = await this.$axios.get('user', {progress: false})
                .catch(error => {
                })

            await commit('FETCH_USER_SUCCESS', data)
        } catch (e) {

            commit('FETCH_USER_FAILURE')
        }
    },
    updateUser ({ commit }, payload) {
        commit('UPDATE_USER', payload)
    },
    async logout ({ commit }) {
        try {
            await this.$axios.post('logout', {}, {progress: false})
        } catch (e) {
        }

        commit('LOGOUT')
        commit('FETCH_USER_FAILURE')
    },
};
