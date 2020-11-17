import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { hostname } from 'os';

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    backgroundColor: '#ffffff',
    icon: `${__dirname}/assets/productbuilder-magenta.ico`,
    show: false, // Dit zet de Browserwindow uit, gevolgd door later een event dat zodra de render ready is op true wordt gezet; Dit voorkomt het showen van een leeg window.
    frame: false,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
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
  };
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
