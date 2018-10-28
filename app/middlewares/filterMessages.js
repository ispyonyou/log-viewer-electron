import {ipcRenderer} from 'electron';

export default store => {
  return (next) => {
    return (action) => {
      const {type, filterLogMessages} = action  
      if (!filterLogMessages) return next(action)

      next(action)

      const state = store.getState()
      ipcRenderer.send('filter-changed', state.filter);
    }
  }
}
