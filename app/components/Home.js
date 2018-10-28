// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import {ipcRenderer} from 'electron';
import LogMessagesList from './LogMessagesList'
import ReactPaginate from 'react-paginate'

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

  handlePageClick = (data) => {
    const from = data.selected * this.props.messagesPerPage
    ipcRenderer.send('get-log-messages', {startIndex: from, size: this.props.messagesPerPage});
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

    let showFlitersLink = null;
//    if (!isFileChosen) {
      showFlitersLink = (
        <div className="navFliters">
          <p onClick={this.handleShowFilters} >Фильтры и настройки</p>
        </div>
      );
//    }

    console.log("render  -", this.props.chosenFilePath)

    return (
      <div>
        <div className="headerPlaceHolder">
          <div className="header">
            {showFlitersLink}
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

    console.log('---', styles.pagination)

    return (
      <ReactPaginate containerClassName={styles.pagination}
                     activeClassName={styles.activePage}
                     pageCount={pagesCount}
                     onPageChange={this.handlePageClick}/>
    );
  }
}

export default connect( (state) => {
  return {
    chosenFilePath: state.chosenFile.filePath,
    filteredMessagesCount: state.logMessages.filteredMessagesCount,
    messagesPerPage: state.settings.messagesPerPage
  }
      }, {
})(Home)