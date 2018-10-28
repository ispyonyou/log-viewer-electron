// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import {ipcRenderer} from 'electron';
import PaginatedLogMessagesList from './PaginatedLogMessagesList'

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
              <PaginatedLogMessagesList />
            </div>
        </div>
      </div>
    );
  }
}

export default connect( (state) => {
  console.log('from mapDispatchToProps - ', state.chosenFile.filePath);
  return {
    'chosenFilePath': state.chosenFile.filePath
  }
      }, {
})(Home)