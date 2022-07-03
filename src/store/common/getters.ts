import { State } from './types';

/**
 *
 * @param state
 */
export function getterWeatherData(state: State) {
  return state.weatherData || [];
}
