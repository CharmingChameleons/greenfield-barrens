import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import currentPage from './currentPage';
import channels from './channels';
import regions from './regions';

export default combineReducers({
  messages,
  user,
  currentPage,
  channels,
  regions
});
