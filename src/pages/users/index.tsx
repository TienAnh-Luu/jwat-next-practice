import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter, PlusCircle, Trash2 } from "lucide-react";
import { User, Tab, TDialog } from "@/pages/users/types";
import { columns } from "@/pages/users/_columns";
import { tabs } from "@/constants/constants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  useDeleteUser,
  useInsertUser,
  useUpdateUser,
} from "@/hooks/useUserMutations";

const fetchUsersData = async (): Promise<User[]> => {
  const response = await fetch("http://localhost:3333/users");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const UsersPage = () => {
  // TODO: using useInfiniteQuery for pagination
  const {
    data: users,
    error: getUsersError,
    isError: isGetUsersError,
    isLoading: isLoadingUsers,
  } = useQuery({ queryKey: ["fetchUsers"], queryFn: fetchUsersData });

  const { toast } = useToast();

  const showToast = (message: string, isSuccessful: boolean) => {
    isSuccessful
      ? toast({
          title: message,
          description: "The operation was successful.",
        })
      : toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        });
  };

  const { isPending: isCreatingUser, mutate: insertUser } =
    useInsertUser(showToast);
  const { isPending: isUpdatingUser, mutate: updateUser } =
    useUpdateUser(showToast);
  const { isPending: isDeletingUser, mutate: deleteUser } =
    useDeleteUser(showToast);

  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isFilterActiveUsers, setIsFilterActiveUser] = useState(false);
  const [openDialog, setOpenDialog] = useState<TDialog>(null);

  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      setFilteredUsers(
        users.filter((user) => {
          if (activeTab === "All") {
            if (isFilterActiveUsers) {
              return user.activeYn === "Y";
            }

            return true;
          } else {
            if (isFilterActiveUsers) {
              return user.activeYn === "Y" && user.role === activeTab;
            }

            return user.role === activeTab;
          }
        })
      );
    }
  }, [isFilterActiveUsers, activeTab, users]);

  const handleSubmitUser = (newUser: User, isUpdating: boolean) => {
    isUpdating ? updateUser(newUser) : insertUser(newUser);
    setOpenDialog(null);
  };

  return (
    <Tabs defaultValue={tabs[0]} value={activeTab}>
      <div className='flex items-center'>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              onClick={() => setActiveTab(tab)}
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
          <Dialog
            open={openDialog === "Add"}
            onOpenChange={(isOpen) => {
              setOpenDialog(isOpen ? "Add" : null);
            }}
          >
            <DialogTrigger className='w-full'>
              <div
                onClick={() => setOpenDialog("Add")}
                className='bg-primary flex items-center rounded text-sm text-white px-3 h-8 gap-1'
              >
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Add User
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Adding new user profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <FormDialog isEditing={false} submitFn={handleSubmitUser} />
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
              isLoading={isLoadingUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UsersPage;
