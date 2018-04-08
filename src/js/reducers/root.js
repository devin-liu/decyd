import { combineReducers } from 'redux';

import dashboard from './dashboard';
import nav from './nav';
import session from './session';
import polls from './polls';

export default combineReducers({
  dashboard,
  nav,
  session,
  polls
});
