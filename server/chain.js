class Poll {
  constructor(question, type, options={}) {
    this.question = question;
    this.type = type;
    this.options = options;
  }

  addOption(option) {
    this.options[option] = new Option(option);
  }
}

class Option {
  constructor(name, img='') {
    this.name = name;
    this.img = img;
    this.votes = 0;
  }

  vote() {
    this.votes++;
  }
}




let lotion = require('lotion')

const electionOptions = {
  Trump: new Option('Trump'),
  Hillary: new Option('Hillary'),
  Bernie: new Option('Bernie'),
}


let app = lotion({
  initialState: {
    count: 0,
    polls: [
      new Poll('Who would you vote for today?', 'Election', electionOptions),
      new Poll('Thanks for your donation to Puerto Rico. Where would you like your funds to go?', 'Funding'),
      new Poll('What is your favorite city to visit? ', 'Travel'),
    ],
  },
  devMode: process.env.PRODUCTION !== 'true'
})

app.use(function (state, tx, chainInfo) {
  if(tx.action === 'vote'){
    const { option, id } = tx;
    let poll = state.polls[id ? parseInt(id) : 0]
    if(!poll.options[option]) poll.options[option] = new Option(option);
    poll.options[option].votes++;
  }

  if(tx.action === 'addOption'){
    const { option, id } = tx;
    if(!state.poll.options[tx.option]) state.poll.options[tx.option] = new Option(tx.option);
  }

  if(tx.action === 'addPoll'){
    const length = state.polls;
    const { question } = tx;
    state.polls[length] = new Poll(question);
  }
  state.count++
})

app.useBlock(function (state, chainInfo) {
  // do something once per block here
})


let port = process.env.PORT || 3001
app.listen(port)




module.exports = app;
