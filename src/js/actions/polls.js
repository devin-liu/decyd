import { POLLS_LOAD, POLLS_UNLOAD, POLL_LOAD, POLL_UNLOAD } from '../actions';
import {
  watchPolls, unwatchPolls, watchPoll, unwatchPoll
} from '../api/polls';

export function loadPolls() {
  return dispatch => (
    watchPolls()
      .on('success',
        payload => dispatch({ type: POLLS_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: POLLS_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadPolls() {
  unwatchPolls();
  return { type: POLLS_UNLOAD };
}

export function loadPoll(id) {
  return dispatch => (
    watchPoll(id)
      .on('success',
        payload => dispatch({ type: POLL_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: POLL_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadPoll(id) {
  unwatchPoll(id);
  return { type: POLL_UNLOAD };
}
