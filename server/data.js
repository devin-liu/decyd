const _sessions = {};
const _notifiers = {
  poll: []
};

export const polls = [
  {
    id: 'poll-1',
    name: 'Initializing instance',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'poll-2',
    name: 'Adding components',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'poll-3',
    name: 'Testing infrastructure',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'poll-4',
    name: 'Removing instance',
    percentComplete: 0,
    status: 'Waiting'
  }
];

const increments = [5, 10, 20, 25];

setInterval(
  () => {
    const poll = polls[
      Math.floor(Math.random() * polls.length)
    ];

    if (!poll.percentComplete) {
      poll.status = 'Running';
    }

    _notifiers.poll.forEach(notifier => notifier(poll));
  },
  2000
);

setInterval(
  () => {
    polls.forEach((poll) => {
      if (poll.status === 'Running') {
        if (poll.percentComplete < 100) {
          poll.percentComplete = Math.min(100, poll.percentComplete +
            increments[
              Math.floor(Math.random() * increments.length)
            ]
          );
        } else {
          poll.percentComplete = 0;
          poll.status = 'Waiting';
        }
        _notifiers.poll.forEach(notifier => notifier(poll));
      }
    });
  },
  1000
);

export function addSession(token, data) {
  _sessions[token] = data;
}

export function getSession(token) {
  return _sessions[token];
}

export function addNotifier(type, cb) {
  _notifiers[type].push(cb);
}

export function getPolls(filters) {
  if (filters) {
    return Promise.resolve({
      polls: polls.filter(poll =>
        Object.keys(filters).some(filter => poll[filter] === filters[filter])
      )
    });
  }
  return Promise.resolve({ polls });
}

export function getPoll(id) {
  let poll;
  polls.some((t) => {
    if (t.id === id) {
      poll = t;
      return true;
    }
    return false;
  });
  return Promise.resolve({ poll });
}

export default { addNotifier, addSession, getSession, getPoll, getPolls };
