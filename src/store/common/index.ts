import { Module } from 'vuex';
import { State } from './types';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { VuexRootState } from '../index';

export * from './actions';
export * from './mutations';
export * from './types';

const module: Module<State, VuexRootState> = {
  namespaced: true,
  state: {
    todoData: { userId: 1, id: 1, title: '', completed: true }
  },
  actions,
  getters,
  mutations
};

export default module;
