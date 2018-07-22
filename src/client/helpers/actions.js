export const ADD_TODOS = 'ADD_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_PRELOADER_STATE = 'SET_PRELOADER_STATE';
export const SET_ERROR_STATE = 'SET_ERROR_STATE';
import  {getTodos, addTodo, delTodo, updateTodo, toggleComplete} from '../helpers/API';




export const addTodosAction = (payload) => ({type: ADD_TODOS, payload});
export const addTodoAction = (payload) => ({type: ADD_TODO , payload});
export const deleteAction = (payload) => ({type: DELETE, payload});
export const updateAction = (payload) => ({type: UPDATE, payload});
export const toggleAction = (payload) => ({type: TOGGLE_TODO, payload});
export const togglePreloaderAction = (payload) => ({type: SET_PRELOADER_STATE, payload});
export const toggleErrorAction = (payload) =>({type: SET_ERROR_STATE, payload});

export const asyncGetTodosAction = (payload) => (dispatch) => {
    dispatch(togglePreloaderAction(true));
    getTodos()
        .then((todos) => {
            dispatch(togglePreloaderAction(false))
            dispatch(addTodosAction(todos))
        })
        
    
}

export const asyncAddTodoAction = (payload) => (dispatch) => {
    dispatch(togglePreloaderAction(true));

    addTodo(payload)    
        .then((todo) => {
            dispatch(togglePreloaderAction(false))
            dispatch(addTodoAction(todo))
        })
}

export const asyncDelTodoActions = (payload) => (dispatch) => {
    dispatch(togglePreloaderAction(true));
    
    delTodo(payload)
        .then((response)  => {
            dispatch(togglePreloaderAction(false))

            if (response.success) {
                dispatch(deleteAction(payload))
            }
            
        })
}

export const asyncUpdateAction = (payload) => (dispatch) => {
    dispatch(togglePreloaderAction(true));

    updateTodo(payload)
        .then((response)  => {
            dispatch(togglePreloaderAction(false))

            if (response.success) {
                dispatch(updateAction(response.todo))
            }
            
        })
}

export const asyncToggleCompleteAction = (payload) => (dispatch) => {
    dispatch(togglePreloaderAction(true));

    toggleComplete(payload)
        .then((response) => {
            dispatch(togglePreloaderAction(false))

            if (response.success) {
                dispatch(toggleAction(response.todo))
            }

            if(!response.success) {
                dispatch(toggleErrorAction(true))
            }
        })
        .catch(e => {
            dispatch(toggleErrorAction(true))
        }) 
            
         
            
        
}
