const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, '../../resources/icon.png'),
    webPreferences: {
      nodeIntegration: false, // Desactiva acceso a Node.js por seguridad
      contextIsolation: true,
      roadmap: false

    }
  });
  // Redirige enlaces externos al navegador predeterminado
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      require('electron').shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.loadURL('https://erp-pulsar.vercel.app/login'); // Reemplaza con tu URL

  // Ocultar la barra de menú
  mainWindow.setMenu(null);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
