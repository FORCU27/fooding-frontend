export {};

declare global {
  interface Window {
    interop?: {
      setBadgeCount: (count: number) => void;
    };
  }
}
