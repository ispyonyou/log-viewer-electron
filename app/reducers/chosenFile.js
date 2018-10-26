const defaultState = {
  filePath: ''
}

export default function chosenFile(state = defaultState, action) {
  switch (action.type) {
    case 'CHANGE_FILE':
      return {
        ...state, filePath: action.payload.filePath
      }
    default:
      return state;
  }
}
