import { app, BrowserWindow } from "electron";

const WEB_APP_URL = "https://app.fooding.im";

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
    },
  });

  browserWindow.loadURL(WEB_APP_URL);
});
