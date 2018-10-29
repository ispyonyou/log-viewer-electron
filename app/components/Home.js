// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import {ipcRenderer} from 'electron';
import LogMessagesList from './LogMessagesList';
import ReactPaginate from 'react-paginate';
import {setSelectedMessagesPage} from '../actions/logMessages';

import styles from './Home.css';

class Home extends Component {
  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("onDrop");

    for (let f of e.dataTransfer.files) {
      ipcRenderer.send('some-file-dropped', f.path)
    }
  }

  handleShowFilters = () => {
    ipcRenderer.send('show-filter', {});
  }

  handleShowSettings = () => {
    ipcRenderer.send('show-settings', {});
  }

  handlePageClick = (data) => {
    this.props.setSelectedMessagesPage(data.selected);
//    const from = data.selected * this.props.messagesPerPage
//    ipcRenderer.send('get-log-messages', {startIndex: from, size: this.props.messagesPerPage});
  }

  render() {
    let chosenFileComponent = null;
    if (this.props.chosenFilePath) {
      chosenFileComponent = <h1>{this.props.chosenFilePath}</h1>
    }

    const isFileChosen = (this.props.chosenFilePath && this.props.chosenFilePath !== "");

    let headerComponent = null;
    if (!isFileChosen) {
      headerComponent = ( 
        <div className="chooseFileHeaderFrame" 
             onDrop={this.onDrop}
             onDragOver={this.onDragOver} >
          <p>Выберите файл</p>
        </div>
      );
    }
    else {
      headerComponent = ( 
        <div className="chosenFileHeaderFrame" 
             onDrop={this.onDrop}
             onDragOver={this.onDragOver} >
          <p>{this.props.chosenFilePath}</p>
          {this.renderPaginate()}
        </div>
      );
    }

    let showFiltersLink = null;
//    if (!isFileChosen) {
      showFiltersLink = (
        <div className="navFliters">
          <p onClick={this.handleShowFilters} >Фильтры</p>
          <p onClick={this.handleShowSettings} >Настройки</p>
        </div>
      );
//    }

    console.log("render  -", this.props.chosenFilePath)

    return (
      <div>
        <div className="headerPlaceHolder">
          <div className="header">
            {showFiltersLink}
            {headerComponent}
          </div>
        </div>

        <div className="main">
            <div className="messagesListFrame">
              <LogMessagesList />
            </div>
        </div>
      </div>
    );
  }

  renderPaginate() {
    const pagesCount = Math.ceil(this.props.filteredMessagesCount / this.props.messagesPerPage);

    console.log('--- renderPaginate ---', this.props.filteredMessagesCount, this.props.messagesPerPage);

    return (
      <ReactPaginate containerClassName={styles.pagination}
                     activeClassName={styles.activePage}
                     pageCount={pagesCount}
                     onPageChange={this.handlePageClick}/>
    );
  }
}

//export default connect( (state) => ({
//    chosenFilePath: state.chosenFile.filePath,
//    filteredMessagesCount: state.logMessages.filteredMessagesCount,
//    messagesPerPage: state.settings.messagesPerPage
//}), { setSelectedMessagesPage
//})(Home)

export default connect((state) => ({
  chosenFilePath: state.chosenFile.filePath,
  filteredMessagesCount: state.logMessages.filteredMessagesCount,
  messagesPerPage: state.settings.messagesPerPage,
}), {setSelectedMessagesPage
})(Home)
