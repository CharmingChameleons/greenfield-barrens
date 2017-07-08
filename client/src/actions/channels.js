import { ADD_CHANNEL, SET_CHANNELS } from './actionTypes';

export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel
});

export const setChannels = (channels) => ({
  type: SET_CHANNELS,
  channels
});