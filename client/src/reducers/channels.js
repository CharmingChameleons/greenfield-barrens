import { SET_CHANNELS, ADD_CHANNEL } from '../actions/actionTypes';

const initialState = [
  {
    name: 'General',
    id: 0,
    region: 1
  },
  {
    name: 'Events',
    id: 1,
    region: 1
  },
  {
    name: 'Trade',
    id: 2,
    region: 1
  }
];

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return action.channels;
    case ADD_CHANNEL:
      return [...state, action.channel];
    default:
      return state;
  }
};

export default channels;