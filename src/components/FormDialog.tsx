"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { roles } from "@/constants/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Trash } from "lucide-react";
import { User } from "@/pages/users/types";

const formSchema = z.object({
  username: z.string().min(3).max(50),
  fullname: z.string().min(1).max(100),
  role: z.enum(["Admin", "HR", "Developer", "Security", "Customer"]),
  projects: z.array(z.object({ name: z.string().min(1) })),
});

type FormSchema = z.infer<typeof formSchema>;

type FormDialogProps = {
  isEditing: boolean;
  defaultValues?: FormSchema;
  submitFn: (newUser: User, isUpdating: boolean) => void;
};

const FormDialog = ({
  isEditing = false,
  defaultValues,
  submitFn,
}: FormDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      username: "",
      fullname: "",
      role: "Customer",
      projects: [],
    },
  });

  const { fields, append, remove } = useFieldArray<FormSchema>({
    control: form.control,
    name: "projects",
  });

  function onSubmit(values: FormSchema) {
    submitFn(
      {
        ...values,
        activeYn: "N",
        projects: values.projects.map((proj) => proj.name),
      },
      isEditing
    );
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      append({ name: "" });
      setTimeout(() => {
        const inputs = document.querySelectorAll('input[name^="projects"]');
        const nextInput = inputs[inputs.length - 1] as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} disabled={isEditing} />
              </FormControl>
              {isEditing && (
                <FormDescription>
                  You are not allowed to change username
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='Full Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Projects</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className='flex items-center space-x-2'>
              <FormField
                control={form.control}
                name={`projects.${index}.name`}
                render={({ field }) => (
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Project ${index + 1}`}
                      onKeyDown={(event) => handleKeyDown(event)}
                    />
                  </FormControl>
                )}
              />
              <button
                type='button'
                onClick={() => remove(index)}
                className='p-2 hover:bg-gray-200 rounded'
              >
                <Trash size={18} className='text-red-500' />
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => append({ name: "" })}
            className='flex items-center text-blue-500 mt-2 hover:bg-gray-200 rounded p-2'
          >
            <Plus size={18} className='mr-1' /> Add Project
          </button>
        </FormItem>
        <Button type='submit'>Save</Button>
      </form>
    </Form>
  );
};

export default FormDialog;
