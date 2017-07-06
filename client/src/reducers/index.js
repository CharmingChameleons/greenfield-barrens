import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import currentPage from './currentPage';

export default combineReducers({
  messages,
  user,
  currentPage
});
