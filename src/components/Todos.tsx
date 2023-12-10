import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { Todo } from "../types/todos";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const isGlobalFetching = useIsFetching();

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data: Todo) => {
    createTodoMutation.mutate(data);
  };

  const handleUpdateTodoSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  return (
    <>
      <h1>Todos</h1>

      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <label>
          New todo:
          <input placeholder="title" {...register("title")} />
          <input placeholder="description" {...register("description")} />
          <input
            type="submit"
            disabled={createTodoMutation.isPending}
            value={createTodoMutation.isPending ? "creating..." : "create"}
          />
        </label>
      </form>

      <p>Fetch status: {todosIdsQuery.fetchStatus}</p>
      <p>Status: {todosIdsQuery.status}</p>
      <p>Is fetching: {isGlobalFetching}</p>
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title: {data?.title}</strong>
              <strong>Description: {data?.description}</strong>
            </span>
            <div>
              <button
                onClick={() => handleUpdateTodoSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark"}
              </button>
              {data && data.id && (
                <button onClick={() => handleDeleteTodo(data?.id)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
