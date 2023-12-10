import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { getProjects, getTodo, getTodosIds } from "./api";

export function useTodosIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

// Use useQueries if you don't know how many useQuery you need
export function useTodos(ids: Array<number | undefined> | undefined) {
  return useQueries({
    queries: (ids ?? [])?.map((id) => {
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!),
      };
    }),
  });
}

// A useQuery with pagination
export function useProjects(page: number) {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
}
