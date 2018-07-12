export const ADD_TODOS = 'ADD_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';
export const SET_PRELOADER_STATE = 'SET_PRELOADER_STATE';


export const addTodosAction = (payload) => ({type: ADD_TODOS, payload});
export const addTodoAction = (payload) => ({type: ADD_TODO , payload});
export const deleteAction = (payload) => ({type: DELETE, payload});
export const updateAction = (payload) => ({type: UPDATE, payload});
export const togglePreloaderAction = (payload) => ({type: TOGGLE_PRELOADER, payload});
