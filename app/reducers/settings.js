import {CHANGE_SETTINGS_FORMAT_SQL, CHANGE_SETTINGS_HIGHLIGHT_SQL,
  CHANGE_MESSAGES_PER_PAGE, SET_NEW_SETTINGS 
} from '../actions/settings'

const defaultState = {
  formatSql: true,
  highlightSql: true,
  messagesPerPage: 100,
}

export default (state=defaultState, action) => {
  const { type, payload } = action;
  switch( type )
  {
    case CHANGE_SETTINGS_FORMAT_SQL:
      return {
        ...state, formatSql: payload.formatSql
      }
    case CHANGE_SETTINGS_HIGHLIGHT_SQL: 
      return {
        ...state, highlightSql: payload.highlightSql
      }
    case CHANGE_MESSAGES_PER_PAGE:
      return {
        ...state, messagesPerPage: payload.messagesPerPage
      }
    case SET_NEW_SETTINGS:
      return action.payload.settings;
    default: 
      return state;
  }
}