import RequestWatcher from './request-watcher';

let protocol = 'ws:';
if (window.location.protocol === 'https:') {
  protocol = 'wss:';
}
const host = ((process.env.NODE_ENV === 'development') ?
  'localhost:8102' : `${window.location.host}`);
const webSocketUrl = `${protocol}//${host}`;

const socketWatcher = new RequestWatcher({ webSocketUrl });

let pollsWatcher;

export function watchPolls() {
  pollsWatcher = socketWatcher.watch('/api/poll');
  return pollsWatcher;
}

export function unwatchPolls() {
  if (pollsWatcher) {
    pollsWatcher.stop();
  }
}

const pollWatcher = {};

export function watchPoll(id) {
  pollWatcher[id] = socketWatcher.watch(`/api/poll/${id}`);
  return pollWatcher[id];
}

export function unwatchPoll(id) {
  if (pollWatcher[id]) {
    pollWatcher[id].stop();
  }
}
