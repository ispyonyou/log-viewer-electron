import React from 'react'
import {connect} from 'react-redux'

import SimpleMultiSelect from './SimpleMultiSelect'

import styles from './Filter.css'

import {/*closeFilter, filterLogMessages, */changeFltLogLevels, changeFltLoggers
} from '../actions/filter.js'


class Filter extends React.Component
{
  handleCloseFilter = () => {
    this.props.closeFilter();
  }

  handleLevelsChanged = (selectedOptions) => {
    this.props.changeFltLogLevels(selectedOptions)
//    this.props.filterLogMessages()
  }

  handleLoggersChanged = (selectedOptions) => {
    this.props.changeFltLoggers(selectedOptions)
    this.props.filterLogMessages()
  }

  handleIncludeLevelsChanged = (selectedOptions) => { 
    this.props.changeFltIncludeLogLevevls(this.getSelectedValues(selectedOptions))
    this.props.filterLogMessages()
  }

  getSelectedValues(selectedOptions) {
    return selectedOptions.map(option => option.value).sort();
  }

  render() {
    const {avLogLevels, avLoggers, logLevels, loggers} = this.props;

    const sortedLogLevels = avLogLevels.sort();
    const sortedLoggers = avLoggers.sort();

    return (
      <div className={styles.filter}>
        <div className={styles.container}>
          <div>
            <div className={styles.label}>
              Уровни:
            </div>
            <SimpleMultiSelect options={sortedLogLevels}
                               selectedOptions={logLevels}
                               onChange={this.handleLevelsChanged}/>
          </div>
          <div>
            <div className={styles.label}>
              Логгеры:
            </div>
            <SimpleMultiSelect options={sortedLoggers}
                               selectedOptions={loggers}
                               onChange={this.handleLoggersChanged}/>
          </div>
        </div>
        <p className={styles.btn + ' ' +  styles.close_btn} onClick={this.handleCloseFilter}>Close Filter</p>
      </div>
    );
  }
}

export default connect((state) => ({
  logLevels: state.filter.logLevels,
  loggers: state.filter.loggers,
  avLogLevels: state.filter.avLogLevels,
  avLoggers: state.filter.avLoggers,
}), {/*closeFilter, filterLogMessages, */changeFltLogLevels/*, changeFltLoggers*/
})(Filter)
