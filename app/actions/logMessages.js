export const SET_FILTERED_LOG_MESSAGES = 'SET_FILTERED_LOG_MESSAGES'
export const SET_SELECTED_MESSAGES_PAGE = 'SET_SELECTED_MESSAGES_PAGE'

export function changeFilteredMessages(messagesCount) {
  return {
    type: SET_FILTERED_LOG_MESSAGES,
    payload: { messagesCount: messagesCount }
  }
}

export function setSelectedMessagesPage(selectedPage){
  console.log( 'in setSelectedMessagesPage', selectedPage)
  return {
    type: SET_SELECTED_MESSAGES_PAGE,
    reloadMessages: true,
    payload: { selectedPage }
  }
}