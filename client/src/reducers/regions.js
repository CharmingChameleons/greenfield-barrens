import { SET_REGIONS, ADD_REGIONS } from '../actions/actionTypes';

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

const regions = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGIONS:
      return action.regions;
    case ADD_REGIONS:
      return [...state, action.region];
    default:
      return state;
  }
};

export default regions;