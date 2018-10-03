import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
  },
  getters: {
    getList: state => state.videos,
  },
  mutations: {
    updateList(state, list) {
      state.videos = list;
    },
  },
  actions: {
    // { dispatch, commit, getters, rootGetters }
    fetchVideoList({ commit }) {
      axios.get('/api/video').then((response) => {
        commit('updateList', response.data.videos);
      });
    },
  },
});
