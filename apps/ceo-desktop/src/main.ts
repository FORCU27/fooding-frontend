import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

const WEB_APP_URL = 'http://localhost:3000/';

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 맥OS에서 최소화, 최대화 버튼 숨기기
  if (process.platform === 'darwin') {
    browserWindow.setWindowButtonVisibility(false);
  }

  browserWindow.loadURL(WEB_APP_URL);

  //개발자도구 열기
  browserWindow.webContents.openDevTools();
});

ipcMain.handle('set-badge-count', (event, count: number) => {
  app.setBadgeCount(count);
});
