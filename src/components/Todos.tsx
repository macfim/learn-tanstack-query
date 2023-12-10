import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries";

export default function Todos() {
  const { data, fetchStatus, status } = useTodosIds();
  const todosQueries = useTodos(data);
  const isGlobalFetching = useIsFetching();

  return (
    <>
      <h1>Todos</h1>
      <p>Fetch status: {fetchStatus}</p>
      <p>Status: {status}</p>
      <p>Is fetching: {isGlobalFetching}</p>
      {todosQueries.map(({ data }) => (
        <li key={data?.id}>
          <div>Id: {data?.id}</div>
          <span>
            <strong>Title: {data?.title}</strong>
            <strong>Description: {data?.description}</strong>
          </span>
        </li>
      ))}
    </>
  );
}
