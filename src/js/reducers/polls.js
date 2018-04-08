import { POLLS_LOAD, POLLS_UNLOAD, POLL_LOAD, POLL_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  polls: [],
  poll: undefined
};

const handlers = {
  [POLLS_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [POLLS_UNLOAD]: () => initialState,
  [POLL_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [POLL_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
