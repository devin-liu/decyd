import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';

import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';


import Header from 'grommet/components/Header';

import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';



import NavControl from '../components/NavControl';
import {
  loadDashboard, unloadDashboard
} from '../actions/dashboard';

import { pageLoaded } from './utils';

class Dashboard extends Component {
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadDashboard());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadDashboard());
  }

  render() {
    const { error, tasks } = this.props;
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
    } else if (tasks.length === 0) {
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
      const tasksNode = (tasks || []).map(task => (
        <ListItem
          key={`task_${task.id}`}
          justify='between'
        >
          <Label><Anchor path={`/tasks/${task.id}`} label={task.name} /></Label>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
            <Value
              value={task.percentComplete}
              units='%'
              align='start'
              size='small'
            />
            <Meter value={task.percentComplete} />
          </Box>
        </ListItem>
      ));

      listNode = (
        <List>
          {tasksNode}
        </List>
      );
    }
    // star backgroudn https://imgur.com/a/hfb5w
    return (
      <Article primary={true}>
        <Hero background={<Image src='/img/star-bg.jpg'
          fit='cover'
          full={true} />}
          backgroundColorIndex='dark'>
          <Box direction='row'
            justify='center'
            align='center'>
            <Box basis='1/2'
              align='end'
              pad='medium'>
              <Image src='/img/logo.svg' />
            </Box>
            <Box basis='1/2'
              align='start'
              pad='medium'>
              <Headline margin='none' size='large' strong={true}>
                decyd.io
              </Headline>
              <br/>
              <Headline margin='none' size='small'>
                THE BLOCKCHAIN VOTING SYSTEM
              </Headline>
            </Box>
          </Box>
        </Hero>
        <Box direction='row'
            justify='center'
            align='center'>
          <Box pad='medium'>
            <Heading tag='h1' strong={true}>
              Crowd Deciding
            </Heading>
            <Paragraph size='large'>
              Blockchain is a way to store and share data that is transparent, secure, and public. As part of a blockchain hackathon, we have created this fully functional voting system on blockchain.
            </Paragraph>
          </Box>
        </Box>
        <Box direction='row'  align='center' justify='center'>
          <Box pad='medium'>
            <Button label='Vote Polls'
              href='/polls'
              primary={false}
              secondary={false}
              accent={true}
              critical={false}
              plain={false} />
          </Box>
        </Box>
      </Article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  tasks: []
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Dashboard);
