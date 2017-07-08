import { ADD_REGION, SET_REGIONS } from './actionTypes';

export const addRegion = (region) => ({
  type: ADD_REGION,
  region
});

export const setRegions = (regions) => ({
  type: SET_REGIONS,
  regions
});