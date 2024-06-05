import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/pages/users/types";

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

const fetchDeleteUser = async (username: string): Promise<string> => {
  const response = await fetch(`http://localhost:3333/users/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: username,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error deleting user");
  }

  return response.json();
};

function useUserMutation<T>(
  mutationFn: (data: T) => Promise<any>,
  type: "added" | "updated" | "deleted",
  showToast: (text: string, isSuccessful: boolean) => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchUsers"] });
      showToast(`User ${type} successfully`, true);
    },
    onError: (error) => {
      showToast(error.toString(), false);
    },
  });
}

export const useInsertUser = (
  showToast: (text: string, isSuccessful: boolean) => void
) => useUserMutation<User>(fetchAddUser, "added", showToast);
export const useUpdateUser = (
  showToast: (text: string, isSuccessful: boolean) => void
) => useUserMutation<User>(fetchUpdateUser, "updated", showToast);
export const useDeleteUser = (
  showToast: (text: string, isSuccessful: boolean) => void
) => useUserMutation<string>(fetchDeleteUser, "deleted", showToast);
