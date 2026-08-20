export {};

declare global {
  type BookingPanelConfig = "cybersecurity" | "infrastructure";
  type InfrastructureBookingTopic =
    | "server"
    | "storage"
    | "network"
    | "virtualization"
    | "data-security"
    | "enquiry";

  interface Window {
    openBookingPanel: (
      config: BookingPanelConfig,
      preselectedTopic?: InfrastructureBookingTopic
    ) => void;
    closeBookingPanel: () => void;
  }
}
