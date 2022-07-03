import Vue from 'vue';
import Vuex from 'vuex';
import common, { State as CommonState } from './common';
export interface VuexRootState {
  common?: CommonState;
}

const modules = {
  common
};

export default new Vuex.Store<VuexRootState>({
  state: {},
  mutations: {},
  actions: {},
  modules
});

export { modules };
