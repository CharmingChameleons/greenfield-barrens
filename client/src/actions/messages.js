import { FETCH_MESSAGES, SET_MESSAGES, UPDATE_MESSAGES } from './actionTypes';

export const fetchMessages = (lat, lon) => ({
  type: FETCH_MESSAGES,
  coords: { lat, lon }
});

export const setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

export const updateMessages = message => ({
  type: UPDATE_MESSAGES,
  message
});

export const updateInitialMessages = messages => ({
  type: UPDATE_INITIAL_MESSAGES,
  messages
});