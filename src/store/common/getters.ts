import { State } from './types';

/**
 *
 * @param state
 */
export function getterTodoData(state: State) {
  return state.todoData || [];
}
