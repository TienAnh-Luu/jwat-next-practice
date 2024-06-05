export type Role = "Developer" | "HR" | "Security" | "Admin" | "Customer";

export type TDialog = "Add" | "ConfirmDelete" | null;

export type Tab = "All" | Role;

export type User = {
  username: string;
  fullname: string;
  role: Role;
  projects: string[];
  activeYn: "Y" | "N";
};
