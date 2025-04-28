import { app, BrowserWindow, ipcMain } from "electron";
import * as path from 'path';

const WEB_APP_URL = "https://app.fooding.im";

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  browserWindow.loadURL(WEB_APP_URL);

  // 개발자도구 열기
  browserWindow.webContents.openDevTools();
});

ipcMain.handle('set-badge-count', (event, count: number) => {
  app.setBadgeCount(count);
})
