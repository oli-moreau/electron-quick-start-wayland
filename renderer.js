/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

//Declarations
const ipc = require('electron').ipcRenderer

//Minimize
function minimizeApp() {
  ipc.send('minimize')
}

//Maximize
function maximizeApp() {
  ipc.send('maximize')
}

//Close
function closeApp() {
  ipc.send('close')
}

//Events
document.querySelector('.close').addEventListener('click', closeApp)
document.querySelector('.maximize').addEventListener('click', maximizeApp)
document.querySelector('.minimize').addEventListener('click', minimizeApp)