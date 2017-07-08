import { LOG_IN, LOG_OUT, GET_USER_INFO, CHANGE_CHANNEL, UPDATE_LOCATION } from '../actions/actionTypes';

const initialState = {
  username: null,
  region: '... nowhere ...',
  channel: 'General'
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, username: action.username };
    case LOG_OUT:
      // set to initial state but keep current region
      return { ...initialState, region: state.region };
    case CHANGE_CHANNEL:
      return { ...state, channel: action.channel };
    case UPDATE_LOCATION:
      return { ...state, region: action.info.region, lat: action.info.lat, lng: action.info.lng };
    default:
      return state;
  }
};

export default user;
