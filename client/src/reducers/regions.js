import { SET_REGIONS, ADD_REGION, GET_REGION } from '../actions/actionTypes';

const initialState = [
  {
    name: 'Americana Building 5',
    id: 0,
    lat: 37.3736629,
    lng: -122.06579110000001,
    radius: 5
  }
];

const regions = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGIONS:
      console.log('In set Regions', action.regions)
      return action.regions;
    case ADD_REGION:
      return [...state, action.region];
    case GET_REGION:
      return state;  
    default:
      return state;
  }
};

export default regions;