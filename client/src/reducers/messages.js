import {
  SET_MESSAGES,
  UPDATE_MESSAGES
} from '../actions/actionTypes';

const initialState = [
    {username: '1', content: '1', channel: 'General', image: 'xfgd'},
    {username: '2', content: '2', channel: 'General', image: 'dsfsdf'},
];

const messages = (state = initialState, action) => {
  switch (action.type) {
  case SET_MESSAGES:
    console.log('reducer message', action.messages);
    return action.messages;
  case UPDATE_MESSAGES:
    console.log('reducer  Update message', action.message.image);
    return [...state, action.message];
  default:
    return state;
  }
};

export default messages;
