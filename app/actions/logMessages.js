export const SET_FILTERED_LOG_MESSAGES = 'SET_FILTERED_LOG_MESSAGES'

export function changeFilteredMessages(messagesCount) {
  return {
    type: SET_FILTERED_LOG_MESSAGES,
    payload: { messagesCount: messagesCount }
  }
}
