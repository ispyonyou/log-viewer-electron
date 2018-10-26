//import {CHANGE_DEFAULT_LOG_MESSAGES, FILTER_LOG_MESSAGES, START,
//  FINISH
//} from '../constants'

const defaultState = {
//  defaultLogMessages: [],
  logMessages: [],
  filtering: false,
}

export default (state = defaultState, action) => {
  const {type} = action;
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
    default: 
      return state;
  }
}