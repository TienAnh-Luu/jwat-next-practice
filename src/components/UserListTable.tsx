import { DataTable } from "./ui/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ColumnDef } from "@tanstack/react-table";
import { User, Tab } from "@/pages/users/types";

type UserListTableProps = {
  data: User[];
  columns: ColumnDef<User>[];
  tabs: Tab[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

const UserListTable = ({
  data,
  columns,
  tabs,
  activeTab,
  setActiveTab,
}: UserListTableProps) => {
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
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size='sm' variant='outline' className='h-8 gap-1'>
            <Trash2 className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Delete
            </span>
          </Button>
          <Button size='sm' className='h-8 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Add User
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value={activeTab}>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your users.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
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

export default UserListTable;
