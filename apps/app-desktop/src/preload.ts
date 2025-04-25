import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('interop', {
  setBadgeCount: (count: number) => {
    console.log(`[interop] Badge count set to: ${count}`);
  },
});
