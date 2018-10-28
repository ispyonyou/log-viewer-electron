export const CHANGE_FLT_LOG_LEVELS = 'CHANGE_FLT_LOG_LEVELS'
export const CHANGE_FLT_LOGGERS = 'CHANGE_FLT_LOGGERS'

export function changeFltLogLevels(logLevels) {
  return {
    type: CHANGE_FLT_LOG_LEVELS,
    payload: { logLevels }
  }
}

export function changeFltLoggers(loggers) {
  return {
    type: CHANGE_FLT_LOGGERS,
    payload: { loggers }
  }
}
