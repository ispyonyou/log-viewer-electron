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

  render() {
    let chosenFileComponent = null;
    if (this.props.chosenFilePath) {
      chosenFileComponent = <h1>{this.props.chosenFilePath}</h1>
    }

    console.log("render  -", this.props.chosenFilePath)

    return (
      <div onDrop={this.onDrop}
           onDragOver={this.onDragOver} >
        <h1>Выберите файл</h1>
        {chosenFileComponent}
        <div className="messagesList">
          <PaginatedLogMessagesList />
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