import { Action, ThunkAction, configureStore, combineReducers, unwrapResult, AsyncThunkAction } from '@reduxjs/toolkit';

import counterReducer from './counterSlice';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export const resetState = () => ({
  type: 'RESET_STATE',
});

export const appReducer = combineReducers({
  counter: counterReducer,
});

// Solution from here to clean part of the state : https://stackoverflow.com/a/35641992
// Could not find a clean solution with typescript so I added ignore comments
// @ts-ignore
export const rootReducer = (state, action) => {
  // Reducers return initial state when called with undefined
  if (action.type === 'RESET_STATE') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// If you want to have async dispatch with correct typing
type ThunkDispatch = typeof store.dispatch; // Get typing from thunk middleware, means that it now returns Promises
export const useAppDispatch = () => useDispatch<ThunkDispatch>(); // Hook to use it

// Dispatch async thunk and returns and unwraped result (result or an error)
// Need useCallback because of dependency arrays
export const useThunkDispatch = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    <R extends any>(asyncThunk: AsyncThunkAction<R, any, any>): Promise<R> => dispatch(asyncThunk).then(unwrapResult),
    [dispatch],
  );
};

// Export root state type depending on declared reducers
export type RootState = ReturnType<typeof store.getState>;

// AppThunk type, code from redux documentation
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
