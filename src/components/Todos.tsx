import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries";
import { useCreateTodo, useUpdateTodo } from "../services/mutations";
import { Todo } from "../types/todos";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const isGlobalFetching = useIsFetching();

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data: Todo) => {
    createTodoMutation.mutate(data);
  };

  const handleUpdateTodoSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
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
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
