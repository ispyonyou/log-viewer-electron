import React from 'react'
import Highlight from 'react-highlight'
import sqlFormatter from 'sql-formatter'
import {connect} from 'react-redux'

import './Highlight.css'

class LogMessage extends React.Component
{
  render() {
    const {lvl, lgr, tm} = this.props.logMessage;

    return (
      <div className="message_row">
        <ul className="message_row_ul">
          <li className="time" key="time">{tm}</li>
          <li className={"log_level "+lvl}  key="log_level">{lvl}</li>
          <li className="logger" key="logger">{lgr}</li>
        </ul>
        {this.getLogMessage()}
      </div>
    )
  }

  getLogMessage() {
    const {formatSql, highlightSql, logMessage} = this.props
    const {lgr, msg} = logMessage;

    var msgText = msg;

    var isSql = lgr.match(/TwQuery\(.+\)/);
    if (isSql) {
      msgText = this.getSqlLogMessageText(msg);
    }

    if (isSql && highlightSql ) {
      return (
        <Highlight className="sql">{msgText}</Highlight>
      )
    }

    return <p className="log_message">{msgText}</p>
  }

  getSqlLogMessageText(msg) {
    if(!this.props.formatSql) {
      return msg;
    }

    return sqlFormatter.format(msg)
  }
}

export default connect((state)=>({
  formatSql: state.settings.formatSql,
  highlightSql: state.settings.highlightSql,
}),{})(LogMessage)
