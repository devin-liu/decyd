import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';

import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';

import {
  loadPolls, unloadPolls
} from '../actions/polls';

import { pageLoaded } from './utils';

class Polls extends Component {
  componentDidMount() {
    pageLoaded('Polls');
    this.props.dispatch(loadPolls());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadPolls());
  }

  render() {
    const { error, polls } = this.props;
    const { intl } = this.context;

    let errorNode;
    let listNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (polls.length === 0) {
      listNode = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      const pollsNode = (polls || []).map((poll, index) => (
        <ListItem
          key={`poll_${index}`}
          justify='start'
        >
          <Label><Anchor path={`/polls/${index}`} label={`${poll.type} | ${poll.question}`} /></Label>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >


          </Box>
        </ListItem>
      ));

      listNode = (
        <List>
          {pollsNode}
        </List>
      );
    }

    return (
      <Article primary={true}>
      <Anchor path='/dashboard'>
          <LinkPrevious a11yTitle='Back to Home' />
        </Anchor>
        <Box direction='row'
            justify='center'
            align='center'>
          <Box pad='medium'>
            <Heading tag='h1' strong={true}>
              Vote Polls
            </Heading>
          </Box>
        </Box>
        <Box direction='row'
            justify='center'
            >
          {listNode}
        </Box>
      </Article>
    );
  }
}

Polls.defaultProps = {
  error: undefined,
  polls: []
};

Polls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  polls: PropTypes.arrayOf(PropTypes.object)
};

Polls.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.polls });

export default connect(select)(Polls);
