import {
  getTodosRequest,
  addTodoRequest,
  delTodoRequest,
  updateTodoRequest,
  toggleCompleteRequest,
} from './API';

export const ADD_TODOS = 'ADD_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_PRELOADER_STATE = 'SET_PRELOADER_STATE';
export const SET_ERROR_STATE = 'SET_ERROR_STATE';
export const TOGGLE = 'TOGGLE';
export const addTodosAction = payload => ({ type: ADD_TODOS, payload });
export const addTodoAction = payload => ({ type: ADD_TODO, payload });
export const deleteAction = payload => ({ type: DELETE, payload });
export const togglePreloaderAction = payload => ({ type: SET_PRELOADER_STATE, payload });
export const toggleErrorAction = payload => ({ type: SET_ERROR_STATE, payload });
export const toggleAction = payload => ({ type: TOGGLE, payload });

/**
 * загружает todos сохраненных в сторе
 * @param {Array} payload массив с todos
 */
export const getTodos = payload => (dispatch) => {
  dispatch(togglePreloaderAction(true));
  getTodosRequest(payload).then((todos) => {
    dispatch(togglePreloaderAction(false));
    dispatch(addTodosAction(todos));
  });
};
/**
 * добавляет todo
 * @param {Object} payload обьект todo c полем name
 */
export const addTodo = payload => (dispatch) => {
  dispatch(togglePreloaderAction(true));
  addTodoRequest(payload).then((todo) => {
    dispatch(togglePreloaderAction(false));
    dispatch(addTodoAction(todo));
  });
};
/**
 * удаляет выбранную todo
 * @param {Object} payload обьект с полями id, name, completed
 */
export const delTodo = payload => (dispatch) => {
  dispatch(togglePreloaderAction(true));

  delTodoRequest(payload).then((response) => {
    dispatch(togglePreloaderAction(false));

    if (response.success) {
      dispatch(deleteAction(payload));
    }
  });
};
/**
 * редактирует выбранную todo
 * @param {Object} payload обьект с полями id, name
 */
export const updateTodo = payload => (dispatch) => {
  dispatch(togglePreloaderAction(true));
  updateTodoRequest(payload).then(({ success, todo }) => {
    dispatch(togglePreloaderAction(false));
    if (success) {
      dispatch(toggleAction(todo));
    }
  });
};
/**
 * помечает выбранную todo как отмеченную
 * @param {Object} payload обьект с полем id
 */
export const toggleComplete = payload => (dispatch) => {
  dispatch(togglePreloaderAction(true));
  toggleCompleteRequest(payload)
    .then(({ success, todo }) => {
      dispatch(togglePreloaderAction(false));
      if (success) {
        dispatch(toggleAction(todo));
      }
      if (!success) {
        dispatch(toggleErrorAction(true));
      }
    })
    .catch(() => {
      dispatch(toggleErrorAction(true));
    });
};
