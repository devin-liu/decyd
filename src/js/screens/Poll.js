import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Label from 'grommet/components/Label';
import Meter from 'grommet/components/Meter';
import Notification from 'grommet/components/Notification';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Paragraph from 'grommet/components/Paragraph';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Image from 'grommet/components/Image';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';


import {
  loadPoll, unloadPoll
} from '../actions/polls';

import { pageLoaded } from './utils';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      option: null
    }
    this.vote = this.vote.bind(this);
  }
  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    pageLoaded('Poll');
    dispatch(loadPoll(params.id));
  }

  componentWillUnmount() {
    const { match: { params }, dispatch } = this.props;
    dispatch(unloadPoll(params.id));
  }

  vote(event) {
    event.preventDefault();

    const option = event.target.value;
    this.setState({option});
    this.postData('http://localhost:3001/txs', {
      action: 'vote',
      option,
      id: this.props.match.params.id
    })
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.error(error))
  }

  postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // *manual, follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

  render() {
    const { error, poll } = this.props;

    let errorNode;
    let pollNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (!poll) {
      pollNode = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      pollNode = (
        <Box pad='medium'>
          <Heading>{poll.question}</Heading>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
          </Box>
        </Box>
      );
    }
    let total = 0;
    if(poll && poll.options){
      Object.keys(poll.options).map(opt => {
        total += parseInt(poll.options[opt].votes);
      })
    }
    const optionsNode = (poll && poll.options) && Object.keys(poll.options).map(opt => {
      const option = poll.options[opt];
      const percent = total ? parseInt((option.votes / total)*100) : 0;
      return (<ListItem key={`${opt}`}>
              <CheckBox
                value={opt}
                checked={this.state.option === opt}
                onClick={this.vote}
                toggle={false} />
              {option.img && <Image src={option.img} size='thumb' />}
              <Label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{opt}
              </Label>
              <Box
                  direction='row'
                  responsive={false}
                  pad={{ between: 'small' }}
                >
                <Label>
                  &nbsp;{` | ${option.votes} | `}&nbsp;
                </Label>
              </Box>
              <Box
                  direction='row'
                  responsive={false}
                  pad={{ between: 'small' }}
                >
                  <Value
                    value={percent}
                    units='%'
                    align='start'
                    size='small'
                  />
                  <Meter value={percent} />
                </Box>
            </ListItem>)
    })


    const bulletsNode =(poll && poll.options) && Object.keys(poll.options).map(opt => {
      const option = poll.options[opt];
      return (
        <div>
        <Table>
          <thead>
          <tr>
              <th>
                {opt}
              </th>
            </tr>
          </thead>
          <tbody>
            {option.bullets && option.bullets.map((bullet,index) => {
              return(<TableRow key={`${bullet}-${index}`}>
                        <td>
                          {bullet}
                        </td>
                      </TableRow>)
                })
              }
          </tbody>
        </Table>
        </div>)
    })

    return (
      <Article primary={true} full={true}>
        <Header
          direction='row'
          size='large'
          colorIndex='light-2'
          align='center'
          responsive={false}
          pad={{ horizontal: 'small' }}
        >
          <Anchor path='/polls'>
            <LinkPrevious a11yTitle='Back to Polls' />
          </Anchor>
          <Heading margin='none' strong={true}>
            Vote
          </Heading>
        </Header>
        {errorNode}

        {pollNode}
        <List>
          {optionsNode}
        </List>
        {(poll && poll.options && poll.type === "Funding" ) &&
          <Headline strong={true}>
            &nbsp;
        </Headline>}
        {(poll && poll.options && poll.type === "Funding" ) && bulletsNode}
      </Article>
    );
  }
}

Poll.defaultProps = {
  error: undefined,
  poll: undefined
};

Poll.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  match: PropTypes.object.isRequired,
  poll: PropTypes.object
};

const select = state => ({ ...state.polls });

export default connect(select)(Poll);
