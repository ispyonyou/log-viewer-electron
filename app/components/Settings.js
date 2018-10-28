import React from 'react';
import {connect} from 'react-redux';

import {changeSettingsFormatSql, changeSettingsHighlightSql, changeMessagesPerPage
} from '../actions/settings';

class Settings extends React.Component
{
  handleCloseSettings = () => { this.props.closeSettings(); }

  handleFormatSqlClicked = (event) => { 
    this.props.changeSettingsFormatSql(event.target.checked);
  }

  handleHighlightSqlClicked = (event) => { 
    this.props.changeSettingsHighlightSql(event.target.checked);
  }

  handleMessagesPerPageChanged = (event) => {
    this.props.changeMessagesPerPage(event.target.value);
  }

//  getSettingsData() {
//    return {
//      formatSql: this.state.formatSql,
//      highlightSql: this.state.highlightSql,
//    }
//  }

  render() {
    var {formatSql, highlightSql, messagesPerPage} = this.props;

    console.log('messagesPerPage - ', messagesPerPage)

    return (
      <div className="settings settings_opened">
          <div>
            <input type="checkbox" id="format_sql" checked={formatSql} onChange={this.handleFormatSqlClicked}/>
            <label htmlFor="format_sql"> Форматировать SQL</label>
          </div>
          <div>
            <input type="checkbox" id="highlight_sql" checked={highlightSql} onChange={this.handleHighlightSqlClicked}/>
            <label htmlFor="highlight_sql"> Подсвечивать SQL</label>
          </div>
          <div>
            <label htmlFor="highlight_sql"> Сообщений на странице: </label>
            <select value={messagesPerPage}
                    onChange={this.handleMessagesPerPageChanged}>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
            </select>
          </div>
          
          <p className="btn close_btn" onClick={this.handleCloseSettings}>Close Settings</p>
      </div>
    );
  }
}

export default connect((state) => ({
  formatSql: state.settings.formatSql,
  highlightSql: state.settings.highlightSql,
  messagesPerPage: state.settings.messagesPerPage,
}), {changeSettingsFormatSql, changeSettingsHighlightSql,
changeMessagesPerPage})(Settings)
