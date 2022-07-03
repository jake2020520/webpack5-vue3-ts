import { ActionContext } from 'vuex';
import { State } from './types';
import { VuexRootState } from '../index';
import { common } from '@/service';

/**
 * vip
 * @param store
 */
export async function getWeather(store: ActionContext<State, VuexRootState>) {
  const data = await common.getWeatherApi();
  store.commit('setWeather', data);
  return data;
}
