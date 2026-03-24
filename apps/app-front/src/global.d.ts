export {};

declare global {
  interface Window {
    interop?: {
      setBadgeCount: (count: number) => void;
    };
    gtag: (...args: unknown[]) => void;
  }
}
