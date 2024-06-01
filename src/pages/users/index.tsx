import { useState } from "react";
import { GetServerSideProps } from "next";
import UserListTable from "@/components/UserListTable";
import { columns } from "./_columns";
import { Tab, User } from "./types";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      username: "nva",
      fullname: "Nguyen Van A",
      role: "Developer",
      activeYn: "Y",
      projects: ["project1", "project2"],
    },
    {
      username: "nvb",
      fullname: "Nguyen Van B",
      role: "Developer",
      activeYn: "Y",
      projects: ["project3", "project4"],
    },
    {
      username: "nvc",
      fullname: "Nguyen Van C",
      role: "Developer",
      activeYn: "Y",
      projects: ["project5", "project6"],
    },
  ];
}

const tabs: Tab[] = ["All", "Developer", "HR", "Security"];

const UsersPage = ({ data }: { data: User[] }) => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  console.log("Active tab: ", activeTab);
  console.log("Data: ", data);

  return (
    <UserListTable
      data={data}
      columns={columns}
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getData();
  const normalizedData = data.map((dat) => ({
    ...dat,
    projects: dat.projects.join(", "),
  }));
  return { props: { data: normalizedData } };
};

export default UsersPage;
