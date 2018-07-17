export const ADD_TODOS = 'ADD_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';
export const SET_PRELOADER_STATE = 'SET_PRELOADER_STATE';
import  {getTodos} from '../helpers/API/';




export const addTodosAction = (payload) => ({type: ADD_TODOS, payload});
export const addTodoAction = (payload) => ({type: ADD_TODO , payload});
export const deleteAction = (payload) => ({type: DELETE, payload});
export const updateAction = (payload) => ({type: UPDATE, payload});
export const togglePreloaderAction = (payload) => ({type: SET_PRELOADER_STATE, payload});

export const asyncGetTodosAction = (payload) => (dispatch) => {
    dispatch(togglePreloaderAction(true));

    getTodos()
        .then(() => dispatch(togglePreloaderAction(false)));
    
}
