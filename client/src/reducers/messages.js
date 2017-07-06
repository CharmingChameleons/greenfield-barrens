import {
  SET_MESSAGES,
  UPDATE_MESSAGES
} from '../actions/actionTypes';

const initialState = [
    {username: '1', content: '1', channel: 'General'},
    {username: '2', content: '2', channel: 'General'},
];

const messages = (state = initialState, action) => {
  switch (action.type) {
  case SET_MESSAGES:
    console.log('In reducer setMessages');
    return action.messages;
  case UPDATE_MESSAGES:
    return [...state, action.messages ];
  default:
    return state;
  }
};

export default messages;
