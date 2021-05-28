import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { hostname } from 'os';
import fs from 'fs';
import path from 'path';

let win: BrowserWindow | null;

const userPath = app.getPath('userData');
const jsonPath = path.resolve(userPath, 'JSON');
if (!fs.existsSync(jsonPath)) {
  fs.mkdirSync(jsonPath, { recursive: true });
}
let filePath = path.resolve(jsonPath, 'test.json');

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 300,
    backgroundColor: '#ffffff',
    icon: `${__dirname}/assets/productbuilder-magenta.ico`,
    show: false, // Dit zet de Browserwindow uit, gevolgd door later een event dat zodra de render ready is op true wordt gezet; Dit voorkomt het showen van een leeg window.
    frame: false,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  if (process.env.NODE_ENV === 'production') {
    win.loadURL(`file://${__dirname}/index.html`);
    // win.webContents.openDevTools();
  } else {
    const HOST = hostname().toLowerCase();
    const PORT = 3000;
    win.loadURL(`http://${HOST}:${PORT}/`);
    win.webContents.openDevTools();
  }

  win.once('ready-to-show', () => {
    (win as BrowserWindow).show();
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});


ipcMain.on('APP_TITLE_REQUEST', (event, arg) => {
  event.returnValue = {
    name: app.getName(),
    version: app.getVersion(),
    fileName: filePath.split(`\\`).pop()
  };
});

// As example
// ipcMain.on('start', (event, arg) => {
//   console.log("We've started", arg)
//   event.returnValue = "It's started"
//   event.reply("async-reply", "This is a later message...")
// })



ipcMain.on('start', async (event, arg) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `{"name": "Jorne Jongsma"}`);
  }

  fs.readFile(filePath, 'utf8', (err, raw) => {
    if (err) console.error(err);
    const data = JSON.parse(raw);
    event.sender.send('data', data);
  });
});

ipcMain.on('save', (event, arg) => {
  fs.writeFileSync(filePath, JSON.stringify(arg));
});

ipcMain.on('newFile', (event, arg) => {
  console.log('new File');
});

ipcMain.on('openFile', (event, arg) => {
  console.log('open File');
  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JSON', extensions: ['json'] }],
    })
    .then((res) => {
      if (!res.canceled) {
        filePath = res.filePaths[0];
        fs.readFile(filePath, 'utf8', (err, raw) => {
          if (err) console.error(err);
          const data = JSON.parse(raw);
          event.sender.send('data', data);
          event.sender.send('APP_TITLE_REQUEST', {
            name: app.getName(),
            version: app.getVersion(),
            fileName: filePath.split(`\\`).pop()
          })
        });
      }
    });
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  (win as BrowserWindow).webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  (win as BrowserWindow).webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
