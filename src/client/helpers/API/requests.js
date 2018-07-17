import fetchPostFactory from './factory';
import fetcFactory from './factory';

export function addTodo(params) {
    return fetchPostFactory('/api/addTodo', params)
}

export function delTodo(params) {
    return fetchPostFactory('/api/delTodo', params)
}

export function updateTodo(params) {
    return fetchPostFactory('/api/updateTodo', params)
}

export function toggleComplete(params) {
    return fetchPostFactory('/api/toggleComplete', params)
}

export function getTodos() {
    return fetcFactory('/api/getTodos', {})
}