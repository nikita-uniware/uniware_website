export {};

declare global {
  type BookingPanelConfig =
    | "cybersecurity"
    | "datacenter"
    | "cloud"
    | "aws"
    | "aws-workloads";

  type CybersecurityBookingTopic = "cybersecurity" | "backup" | "enquiry";

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
    | "enquiry";

  type AwsBookingTopic =
    | "aws-migration"
    | "aws-managed-services"
    | "aws-consulting"
    | "aws-enquiry";

  type AwsWorkloadsBookingTopic = "amazon-rds" | "generative-ai" | "aws-enquiry";

  type BookingTopic =
    | CybersecurityBookingTopic
    | DatacenterBookingTopic
    | CloudBookingTopic
    | AwsBookingTopic
    | AwsWorkloadsBookingTopic;

  interface Window {
    openBookingPanel: (
      config: BookingPanelConfig,
      preselectedTopic?: BookingTopic
    ) => void;
    closeBookingPanel: () => void;
  }
}
