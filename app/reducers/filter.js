/*import {CHANGE_FLT_INCLUDE_LOG_LEVEVLS, CHANGE_FLT_EXCLUDE_LOG_LEVEVLS,
  CHANGE_FLT_INCLUDE_LOGGERS, CHANGE_FLT_EXCLUDE_LOGGERS, CHANGE_FLT_LOG_LEVELS, 
  CHANGE_FLT_LOGGERS 
} from '../constants'
*/

import {CHANGE_FLT_LOG_LEVELS, CHANGE_FLT_LOGGERS} from '../actions/filter';

const defaultState = {
  logLevels: [],
  loggers: [],
  avLogLevels: [],
  avLoggers: [],
}

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CHANGE_FLT_LOG_LEVELS: return {
      ...state, logLevels: payload.logLevels
    }
    case CHANGE_FLT_LOGGERS: return {
      ...state, loggers: payload.loggers
    }
    case 'SET_AV_LOG_LEVELS':
      return {
        ...state, avLogLevels: payload.avLogLevels
      }
    
    default: return state;
  }
}
