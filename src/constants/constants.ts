import { Role, Tab } from "@/pages/users/types";

export const roles: Role[] = [
  "Developer",
  "Admin",
  "HR",
  "Security",
  "Customer",
];
export const tabs: Tab[] = ["All", ...roles];
