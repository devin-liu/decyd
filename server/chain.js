class Poll {
  constructor(question) {
    this.question = question;
    this.options = {};
  }

  addOption(option) {
    this.options[option] = new Option(option);
  }
}

class Option {
  constructor(name) {
    this.name = name;
    this.votes = 0;
  }

  vote() {
    this.votes++;
  }
}




let lotion = require('lotion')
const poll = new Poll('Who is next president?')

let app = lotion({
  initialState: {
    count: 0,
    poll,
  },
  devMode: process.env.PRODUCTION !== 'true'
})

app.use(function (state, tx, chainInfo) {
  if(tx.action === 'vote'){
    if(!state.poll.options[tx.option]) state.poll.options[tx.option] = new Option(tx.option);
    state.poll.options[tx.option].votes++;
  }

  if(tx.action === 'addOption'){
    if(!state.poll.options[tx.option]) state.poll.options[tx.option] = new Option(tx.option);
  }
  state.count++
})

app.useBlock(function (state, chainInfo) {
  // do something once per block here
})


let port = process.env.PORT || 3001
app.listen(port)




module.exports = app;
