import axios from "axios";
import { Todo } from "../types/todos";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getTodosIds = async () => {
  return (await axiosInstance.get<Array<Todo>>("/todos")).data.map(
    (todo) => todo.id
  );
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`/todos/${id}`)).data;
};
