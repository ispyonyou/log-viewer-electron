export const CHANGE_FLT_LOG_LEVELS = 'CHANGE_FLT_LOG_LEVELS'
export const CHANGE_FLT_LOGGERS = 'CHANGE_FLT_LOGGERS'
export const SET_AV_LOG_LEVELS = 'SET_AV_LOG_LEVELS'
export const SET_AV_LOGGERS = 'SET_AV_LOGGERS'

export function changeFltLogLevels(logLevels) {
  return {
    type: CHANGE_FLT_LOG_LEVELS,
    filterLogMessages: true,
    payload: { logLevels }
  }
}

export function changeFltLoggers(loggers) {
  return {
    type: CHANGE_FLT_LOGGERS,
    payload: { loggers }
  }
}

export function setAvLogLevels(logLevels) {
  return {
    type: SET_AV_LOG_LEVELS,
    payload: { avLogLevels: logLevels }
  }
}

export function setAvLogLoggers(loggers) {
  return {
    type: SET_AV_LOGGERS,
    payload: { avLoggers: loggers }
  }
}
