import {CHANGE_SETTINGS_FORMAT_SQL, CHANGE_SETTINGS_HIGHLIGHT_SQL,
  CHANGE_MESSAGES_PER_PAGE 
} from '../constants'

const defaultState = {
  formatSql: true,
  highlightSql: true,
  messagesPerPage: 100,
}

export default (state=defaultState, action) => {
  const { type } = action;
  switch( type )
  {
    case CHANGE_SETTINGS_FORMAT_SQL: return {
      ...state, formatSql: action.payload.formatSql
    }
    case CHANGE_SETTINGS_HIGHLIGHT_SQL: return {
      ...state, highlightSql: action.payload.highlightSql
    }
    case CHANGE_MESSAGES_PER_PAGE: return {
      ...state, messagesPerPage: action.payload.messagesPerPage
    }
    default: return state;
  }
}