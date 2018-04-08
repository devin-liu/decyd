import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Meter from 'grommet/components/Meter';
import Notification from 'grommet/components/Notification';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import {
  loadPoll, unloadPoll
} from '../actions/polls';

import { pageLoaded } from './utils';

class Poll extends Component {
  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    pageLoaded('Poll');
    dispatch(loadPoll(params.id));
  }

  componentWillUnmount() {
    const { match: { params }, dispatch } = this.props;
    dispatch(unloadPoll(params.id));
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
      const percent = total ? (option.votes / total)*100 : 0;
      return (<ListItem>
              <Label>
                {opt}
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
