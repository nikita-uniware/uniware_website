export {};

declare global {
  type BookingPanelConfig = "cybersecurity" | "datacenter" | "cloud";
  type DatacenterBookingTopic =
    | "server"
    | "storage"
    | "network"
    | "virtualization"
    | "data-security"
    | "enquiry";
  type CloudBookingTopic =
    | "cloud-infrastructure"
    | "cloud-networking"
    | "cloud-operations"
    | "cloud-security"
    | "aws-migration"
    | "aws-consulting"
    | "aws-managed-services"
    | "enquiry";

  interface Window {
    openBookingPanel: (
      config: BookingPanelConfig,
      preselectedTopic?: DatacenterBookingTopic | CloudBookingTopic
    ) => void;
    closeBookingPanel: () => void;
  }
}
