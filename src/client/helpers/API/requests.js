import { fetchFactory, fetchPostFactory } from './factory';

export function addTodoRequest(params) {
  return fetchPostFactory('/api/addTodo', params);
}
export function delTodoRequest(params) {
  return fetchPostFactory('/api/delTodo', params);
}
export function updateTodoRequest(params) {
  return fetchPostFactory('/api/updateTodo', params);
}
export function toggleCompleteRequest(params) {
  return fetchPostFactory('/api/toggleComplete', params);
}
export function getTodosRequest() {
  return fetchFactory('/api/getTodos', {}).then(res => res.json());
}
export function toggleRequest(params) {
  return fetchPostFactory('/api/toggle', params);
}
