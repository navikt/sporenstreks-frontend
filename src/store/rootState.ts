import { combineReducers, Reducer } from 'redux';
import { HelseSpionState } from '../data/types/sporenstreksTypes';
import { helseSpionReducer } from './reducers/helseSpionReducers';

export interface RootState {
  helseSpionState: HelseSpionState,
}

export const rootReducers: Reducer<RootState> = combineReducers({
  helseSpionState: helseSpionReducer,
});
