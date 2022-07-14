import { ActionContext } from 'vuex';
import { State } from './types';
import { VuexRootState } from '../index';
import { common } from '@/service';

/**
 * vip
 * @param store
 */
export async function getTodoData(store: ActionContext<State, VuexRootState>) {
  const data = await common.getTodoApi();
  store.commit('setWeather', data);
  return data;
}
