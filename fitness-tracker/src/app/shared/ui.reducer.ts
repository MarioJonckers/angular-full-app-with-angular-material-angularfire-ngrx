import { Action } from '@ngrx/store';
import { START_LOADING, STOP_LOADING } from './ui.actions';

export interface State {
  isLoading: boolean
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: Action) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
