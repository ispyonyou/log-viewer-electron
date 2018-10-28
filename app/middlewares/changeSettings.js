import {ipcRenderer} from 'electron';

export default store => {
  return (next) => {
    return (action) => {
      const {type, changeSettings} = action  
      if (!changeSettings)
        return next(action)

      next(action)

      const state = store.getState()
      ipcRenderer.send('settings-changed', state.settings);
    }
  }
}
