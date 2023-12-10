import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todos";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onSettled: (_, error) => {
      if (error) {
        console.error(error);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      await queryClient.invalidateQueries({
        queryKey: ["todos", { id: variables.id }],
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
