import { useState } from "react";
import { useProjects } from "../services/queries";

export default function Projects() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, isFetching } =
    useProjects(page);

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div>
      <div>
        {data.map((project) => (
          <p key={project.id}>{project.name}</p>
        ))}
      </div>
      <span>Current page: {page}</span>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
        Prev page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next page
      </button>
      <div>Is fetching: {isFetching}</div>
    </div>
  );
}
