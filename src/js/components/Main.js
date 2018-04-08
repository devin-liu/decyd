import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

import NavSidebar from './NavSidebar';
import { navResponsive } from '../actions/nav';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Tasks from '../screens/Tasks';
import Polls from '../screens/Polls';
import Task from '../screens/Task';
import Poll from '../screens/Poll';
import NotFound from '../screens/NotFound';

class Main extends Component {
  constructor() {
    super();
    this._onResponsive = this._onResponsive.bind(this);
  }

  _onResponsive(responsive) {
    this.props.dispatch(navResponsive(responsive));
  }

  render() {
    return (
      <App centered={false}>
        <Router>
            <Switch>
              <Route exact={true} path='/' component={Dashboard} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/login' component={Login} />
              <Route path='/polls/:id' component={Poll} />
              <Route path='/polls' component={Polls} />
              <Route path='/tasks/:id' component={Task} />
              <Route path='/tasks' component={Tasks} />
              <Route path='/*' component={NotFound} />
            </Switch>
        </Router>
      </App>
    );
  }
}

Main.defaultProps = {
  nav: {
    active: true, // start with nav active
    enabled: true, // start with nav disabled
    responsive: 'multiple'
  }
};

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    responsive: PropTypes.string
  })
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(Main);
