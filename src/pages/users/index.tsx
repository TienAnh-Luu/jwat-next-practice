import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormDialog from "@/components/FormDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter, PlusCircle, Trash2 } from "lucide-react";
import { User, Tab } from "@/pages/users/types";
import { columns } from "@/pages/users/_columns";
import { tabs } from "@/constants/constants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ConfirmDialog from "@/components/ConfirmDialog";

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
    {
      username: "nvd",
      fullname: "Nguyen Van D",
      role: "Developer",
      activeYn: "N",
      projects: ["project5", "project6"],
    },
    {
      username: "nve",
      fullname: "Nguyen Van E",
      role: "HR",
      activeYn: "N",
      projects: ["project5", "project6"],
    },
    {
      username: "nvf",
      fullname: "Nguyen Van F",
      role: "Security",
      activeYn: "Y",
      projects: ["project5", "project6"],
    },
    {
      username: "nvg",
      fullname: "Nguyen Van G",
      role: "Customer",
      activeYn: "N",
      projects: ["project5", "project6"],
    },
    {
      username: "nvh",
      fullname: "Nguyen Van H",
      role: "Developer",
      activeYn: "Y",
      projects: ["project8", "project9"],
    },
    {
      username: "nvi",
      fullname: "Nguyen Van I",
      role: "Developer",
      activeYn: "Y",
      projects: ["project5", "project6"],
    },
    {
      username: "nvj",
      fullname: "Nguyen Van J",
      role: "Developer",
      activeYn: "N",
      projects: ["project5", "project6"],
    },
    {
      username: "nvk",
      fullname: "Nguyen Van K",
      role: "Developer",
      activeYn: "Y",
      projects: ["project5", "project6"],
    },
  ];
}

const UsersPage = ({ users }: { users: User[] }) => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [isFilterActiveUsers, setIsFilterActiveUser] = useState(false);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    if (isFilterActiveUsers) {
      setFilteredUsers((oldUsers) =>
        oldUsers.filter((user) => user.activeYn === "Y")
      );
    } else {
      setFilteredUsers(
        activeTab === "All"
          ? users
          : users.filter((user) => user.role === activeTab)
      );
    }
  }, [isFilterActiveUsers]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setFilteredUsers(
      tab === "All" ? users : users.filter((user) => user.role === tab)
    );
  };

  return (
    <Tabs defaultValue={tabs[0]} value={activeTab}>
      <div className='flex items-center'>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              onClick={() => handleTabChange(tab)}
              value={tab}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='ml-auto flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 gap-1'>
                <ListFilter className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={isFilterActiveUsers}
                onClick={() => setIsFilterActiveUser((oldValue) => !oldValue)}
              >
                Active
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={selectedUsers.length === 0}
                size='sm'
                variant='outline'
                className='h-8 gap-1'
              >
                <Trash2 className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Delete
                </span>
              </Button>
            </AlertDialogTrigger>
            <ConfirmDialog handleConfirm={() => {}} />
          </AlertDialog>
          <Dialog>
            <DialogTrigger className='w-full'>
              <Button size='sm' className='h-8 gap-1'>
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Add User
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Adding new user profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <FormDialog isEditing={false} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TabsContent value={activeTab}>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your users.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={filteredUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </CardContent>
          {/* <CardFooter>
            <div className='text-xs text-muted-foreground'>
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getData();
  const normalizedUsers = users.map((dat) => ({
    ...dat,
    projects: dat.projects.join(", "),
  }));
  return { props: { users: normalizedUsers } };
};

export default UsersPage;
