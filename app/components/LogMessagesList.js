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

    let key = "lm";
    key += this.props.formatSql ? "_format" : "";
    key += this.props.highlightSql ? "_highlight" : "";

    return (
      <div key={key}>
        {logMessages.map( logMessage => <LogMessage logMessage={logMessage} settings={settings} key={logMessage.id}/>)}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    logMessages: state.logMessages.logMessages,
    formatSql: state.settings.formatSql,
    highlightSql: state.settings.highlightSql,
//    filtering: state.logMessages.filtering,
//    perPage: state.settings.messagesPerPage,
  }
},{})(LogMessagesList)
