import { app, BrowserWindow } from "electron";

const WEB_APP_URL = "https://ceo.fooding.im";

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    webPreferences: {
      contextIsolation: true,
    },
  });

  // 맥OS에서 최소화, 최대화 버튼 숨기기
  if (process.platform === 'darwin') {
    browserWindow.setWindowButtonVisibility(false);
  }

  browserWindow.loadURL(WEB_APP_URL);
});
