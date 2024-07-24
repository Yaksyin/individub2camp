import { createStore } from 'vuex';
import cookie from 'js-cookie';

const store = createStore({
  state: {
    token: null,
  },
  mutations: {
    SET_LOGOUT(state) {
      state.token = null;
    },
  },
  actions: {
    logout({ commit }) {
      commit('SET_LOGOUT');
      cookie.remove('token');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});

export default store;