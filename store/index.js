import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    /**
     * @type {LogInfo[]}
     */
    log: [],
    videoWidth: 1280,
    videoHeight: 720,
    pathDrawWidth: 355,
    pathDrawHeight: 200,
  },
  mutations: {
    /**
     * @param state
     * @param {LogInfo} data
     */
    PUSH_TO_LOG(state, data) {
      state.log.push(data);
    }
  },
  getters: {},
  actions: {},
});