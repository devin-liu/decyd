import express from 'express';
import { addSession, getPolls, getPoll } from './data';

const router = express.Router();

router.post('/sessions', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === 'error') {
    res.statusMessage = 'Invalid email or password';
    res.status(401).end();
  } else {
    const name = email.split('@')[0].replace(/\.|_/, ' '); // simulated
    const now = new Date();
    const token = `token-${now.getTime()}`; // simulated
    const session = { email, name, token };
    addSession(token, session);
    res.json(session);
  }
});

router.get('/poll', (req, res) => {
  getPolls(req.query).then(polls => res.json(polls));
});

router.get('/poll/:id', (req, res) => {
  getPoll(req.params.id).then((result) => {
    if (!result.poll) {
      res.status(404).end();
    } else {
      res.json(result);
    }
  });
});

router.delete('/sessions/*', (req, res) => {
  res.json(undefined);
});

module.exports = router;
