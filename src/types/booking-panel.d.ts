export {};

declare global {
  interface Window {
    openBookingPanel: () => void;
    closeBookingPanel: () => void;
  }
}
