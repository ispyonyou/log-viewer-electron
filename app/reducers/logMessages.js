import {SET_FILTERED_LOG_MESSAGES, SET_SELECTED_MESSAGES_PAGE } from '../actions/logMessages';

const defaultState = {
  logMessages: [],
  filteredMessagesCount: 0,
  filtering: false,
  selectedMessagesPage: 0,
}

export default (state = defaultState, action) => {
  console.log( '--- in logMessages reducer --', action );
  const {type, payload} = action;
  switch (type) {
    case 'SET_LOG_MESSAGES': 
      return {
        ...state, logMessages: action.payload.logMessages
      }
    case SET_FILTERED_LOG_MESSAGES:
      return {
        ...state, filteredMessagesCount: payload.messagesCount
      }
    case SET_SELECTED_MESSAGES_PAGE:
      console.log('in reducer SET_SELECTED_MESSAGES_PAGE', payload);
      return {
        ...state, selectedMessagesPage: payload.selectedPage
      }
    default: 
      return state;
  }
}