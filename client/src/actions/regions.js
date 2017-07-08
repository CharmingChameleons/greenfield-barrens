import { ADD_REGION, SET_REGIONS, GET_REGION } from './actionTypes';

export const addRegion = (region) => ({
  type: ADD_REGION,
  region
});

export const setRegions = (regions) => ({
  type: SET_REGIONS,
  regions
});

export const getRegion = (region) => ({
  type: GET_REGION,
  region
});