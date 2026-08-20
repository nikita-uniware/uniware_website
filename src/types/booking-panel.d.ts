export {};

declare global {
  type BookingPanelConfig = "cybersecurity" | "infrastructure" | "cloud";
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
