"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import FormDialog from "@/components/FormDialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useDeleteUser, useUpdateUser } from "@/hooks/useUserMutations";
import { useState } from "react";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "activeYn",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;

      return user.activeYn === "Y" ? (
        <Badge
          variant='outline'
          className='border-lime-600 text-lime-600 py-[6px]'
        >
          Active
        </Badge>
      ) : (
        <Badge
          variant='outline'
          className='p-[6px] border-red-600 text-red-600'
        >
          Offline
        </Badge>
      );
    },
  },
  {
    accessorKey: "projects",
    header: "Projects",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [isOpenDialog, setIsOpenDialog] = useState(false);

      const formUser = {
        ...user,
        projects: user.projects
          .toString()
          .split(",")
          .map((proj) => ({ name: proj })),
      };

      const { isPending: isUpdatingUser, mutate: updateUser } = useUpdateUser();
      const { isPending: isDeletingUser, mutate: deleteUser } = useDeleteUser();

      const handleSubmitForm = (u: User) => {
        updateUser(u);
        setIsOpenDialog(false);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Dialog
              open={isOpenDialog}
              onOpenChange={(isOpen) => setIsOpenDialog(isOpen)}
            >
              <DialogTrigger className='w-full'>
                <DropdownMenuItem
                  className='hover:cursor-pointer'
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => setIsOpenDialog(true)}
                >
                  Edit User
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                    Make changes to user profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <FormDialog
                  isEditing
                  defaultValues={formUser}
                  submitFn={handleSubmitForm}
                />
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className='hover:cursor-pointer'
                  onSelect={(e) => e.preventDefault()}
                >
                  Delete User
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <ConfirmDialog handleConfirm={() => deleteUser(user.username)} />
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
