const axios = require('axios');


const _sessions = {};
const _notifiers = {
  poll: []
};



export const polls = [
  {
    id: '0',
    name: 'Poll 1',
    question: 'Who is the next president?',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: '1',
    name: 'Poll 2',
    question: 'What is for dinner?',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: '2',
    name: 'Poll 3',
    question: 'Which sponsor is your favorite?',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: '3',
    name: 'Poll 4',
    question: 'Can you say hi to me?',
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
  return axios.get('http://localhost:3001/state')
  .then(response => {
    return Promise.resolve({polls: response.data.polls})
  })
  .catch(error => {
    console.log(error);
  });
}

export function getPoll(id) {
  // polls.some((t) => {
  //   if (t.id === id) {
  //     poll = t;
  //     return true;
  //   }
  //   return false;
  // });
  // return Promise.resolve({ poll });
  return axios.get('http://localhost:3001/state')
  .then(response => {
  console.log(id)
    console.log(response.data.polls[id]);
    console.log(response.data.polls[parseInt(id)]);
    return Promise.resolve({poll: response.data.polls[parseInt(id)]})
  })
  .catch(error => {
    console.log(error);
  });
}

export default { addNotifier, addSession, getSession, getPoll, getPolls };
