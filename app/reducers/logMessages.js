//import {CHANGE_DEFAULT_LOG_MESSAGES, FILTER_LOG_MESSAGES, START,
//  FINISH
//} from '../constants'

import {SET_FILTERED_LOG_MESSAGES} from '../actions/logMessages';

const defaultState = {
//  defaultLogMessages: [],
  logMessages: [],
  filteredMessagesCount: 0,
  filtering: false,
}

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
//    case CHANGE_DEFAULT_LOG_MESSAGES: return {
//      defaultLogMessages: action.payload.defaultLogMessages,
//      logMessages: action.payload.defaultLogMessages,
//    }
    case 'SET_LOG_MESSAGES': 
      return {
        ...state, logMessages: action.payload.logMessages
      }
//    case FILTER_LOG_MESSAGES + START: return {
//      ...state, filtering: true
//    }
//    case FILTER_LOG_MESSAGES + FINISH: return {
//      ...state, 
//      logMessages: action.filteredLogMessages,
//      filtering: false
//    }
    case SET_FILTERED_LOG_MESSAGES:
      return {
        ...state, filteredMessagesCount: payload.messagesCount
      }
    default: 
      return state;
  }
}