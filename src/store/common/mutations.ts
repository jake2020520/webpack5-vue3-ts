import { State } from './types';

export function setWeather(state: State, payload: any) {
  state.weatherData = payload;
}
