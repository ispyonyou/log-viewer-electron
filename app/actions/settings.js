export const CHANGE_SETTINGS_FORMAT_SQL = 'CHANGE_SETTINGS_FORMAT_SQL'
export const CHANGE_SETTINGS_HIGHLIGHT_SQL = 'CHANGE_SETTINGS_HIGHLIGHT_SQL'
export const CHANGE_MESSAGES_PER_PAGE = 'CHANGE_MESSAGES_PER_PAGE'
export const SET_NEW_SETTINGS = 'SET_NEW_SETTINGS'

export function changeSettingsFormatSql(formatSql) {
  return {
    type: CHANGE_SETTINGS_FORMAT_SQL,
    changeSettings: true,
    payload: { formatSql }
  }
}

export function changeSettingsHighlightSql(highlightSql) {
  return {
    type: CHANGE_SETTINGS_HIGHLIGHT_SQL,
    changeSettings: true,
    payload: { highlightSql }
  }
}

export function changeMessagesPerPage(messagesPerPage) {
  return {
    type: CHANGE_MESSAGES_PER_PAGE,
    changeSettings: true,
    payload: { messagesPerPage }
  }
}

export function setSettings(newSettings) {
  return {
    type: SET_NEW_SETTINGS,
    payload: { settings: newSettings }
  }
}