import {ipcRenderer} from 'electron';

export default store => {
  return (next) => {
    return (action) => {
      console.log('in loadMessages middleware', action);

      if (!action.reloadMessages) return next(action)

      next(action);
      
      const state = store.getState();
      console.log('in action.reloadMessages', state);

      console.log(state.logMessages.selectedMessagesPage);
      console.log(state.settings.messagesPerPage);

      const from = state.logMessages.selectedMessagesPage * state.settings.messagesPerPage;      
      const arg = {'startIndex': from, 'size': state.settings.messagesPerPage};

      console.log('-- send get-log-messages --', arg);
      ipcRenderer.send('get-log-messages', arg);
    }
  }
}
