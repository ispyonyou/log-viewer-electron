/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import fs from 'fs'
import iconvlite from 'iconv-lite'

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

let allLogMessages = [];
let filteredLogMessages = [];

const getAvLogLevels = () => {
  var logLevelsSet = new Set();
  allLogMessages.forEach( (msg) => {logLevelsSet.add(msg.lvl); });

  return [...logLevelsSet];
}

const getAvLoggers = () => {
  var res = new Set();
  allLogMessages.forEach( (msg) => {res.add(msg.lgr); });

  return [...res];
}

ipcMain.on('some-file-dropped', (event, arg) => {
  console.log("in 'some-file-dropped' handler привет");
  console.log('---', arg);

  const filePath = arg;

  const buffer = fs.readFileSync(filePath);
  const str = iconvlite.decode(buffer, 'win1251');

  let jsonStr = "[" + str;
  jsonStr = jsonStr.substr(0, jsonStr.length-1) + "]";


  allLogMessages = JSON.parse(jsonStr);
  filteredLogMessages = allLogMessages;

  event.sender.send('new-log-file-was-loaded', filePath)
  event.sender.send('filtered-messages-changed', {messagesCount: filteredLogMessages.length})
})

ipcMain.on('show-filter', (event, arg) => {

  let filterWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    parent: mainWindow
  });

  filterWindow.once('ready-to-show', () => {
    filterWindow.webContents.send('set-av_log_levels', getAvLogLevels()) ;
    filterWindow.webContents.send('set-av_loggers', getAvLoggers()) ;
    filterWindow.show()
  })

  filterWindow.on('close', () => { filterWindow = null });
  filterWindow.loadURL(`file://${__dirname}/app.html#/filter`);
})

ipcMain.on('get-log-messages', (event, arg) => {
  console.log('get-log-messages');
  const logMessages = filteredLogMessages.slice(arg.startIndex, arg.startIndex + arg.size);
  event.sender.send('new-log-messages', logMessages);
})

function filterLogMessages(filter, defaultLogMessages)
{
  var newLogMessages = defaultLogMessages

  if (filter.logLevels.length) {
    newLogMessages = newLogMessages.filter( logMessage => {
      return filter.logLevels.some(level => level === logMessage.lvl)
    } );
  }

  if (filter.loggers.length) {
    newLogMessages = newLogMessages.filter( logMessage => {
      return filter.loggers.some(logger => logger === logMessage.lgr)
    } );
  }

  return newLogMessages;
}

ipcMain.on('filter-changed', (event, arg) => {
  console.log('in filter-changed');
  console.log(arg);
  
  filteredLogMessages = filterLogMessages(arg, allLogMessages)

  mainWindow.webContents.send('filtered-messages-changed', {messagesCount: filteredLogMessages.length})

  
//  const logMessages = allLogMessages.slice(arg.startIndex, arg.startIndex + arg.size);
//  event.sender.send('new-log-messages', logMessages);
})
