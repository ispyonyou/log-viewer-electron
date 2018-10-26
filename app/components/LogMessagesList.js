import React from 'react'
import {connect} from 'react-redux'

import LogMessage from './LogMessage'

class LogMessagesList extends React.Component
{
  render() {
    return (
      <div>
        {this.getBody()}
      </div>
    )
    ;
  }

  getBody() {
    const {logMessages, settings} = this.props


    if (!logMessages || !logMessages.length)
      return <p>No messages</p>

    return (
      <div>
        {logMessages.map( logMessage => <LogMessage logMessage={logMessage} settings={settings} key={logMessage.id}/>)}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    logMessages: state.logMessages.logMessages,
//    filtering: state.logMessages.filtering,
//    perPage: state.settings.messagesPerPage,
  }
},{})(LogMessagesList)
