import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/pages/users/types";
import { toast } from "@/components/ui/use-toast";

// TODO:
// 1. Fix adding error
// 2. Add spinning

const fetchAddUser = async (newUser: User): Promise<string> => {
  const response = await fetch("http://localhost:3333/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error creating user");
  }

  return response.json();
};

const fetchUpdateUser = async (user: User): Promise<string> => {
  const response = await fetch(`http://localhost:3333/users/${user.username}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error updating user");
  }

  return response.json();
};

const fetchDeleteUser = async (
  username: string
): Promise<{ message: string }> => {
  const response = await fetch(`http://localhost:3333/users/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error deleting user");
  }

  return response.json();
};

function useUserMutation<T>(
  mutationFn: (data: T) => Promise<any>,
  type: "added" | "updated" | "deleted"
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchUsers"] });
      toast({
        variant: "success",
        title: `User ${type} successfully`,
        description: "The operation was successful.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.toString(),
      });
    },
  });
}

export const useInsertUser = () => useUserMutation<User>(fetchAddUser, "added");
export const useUpdateUser = () =>
  useUserMutation<User>(fetchUpdateUser, "updated");
export const useDeleteUser = () =>
  useUserMutation<string>(fetchDeleteUser, "deleted");
