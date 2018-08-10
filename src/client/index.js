import './styls/main.scss';
import tempalte from './templates/todo.hbs';
import store from './helpers/store';
import {
  getTodos,
  addTodo,
  delTodo,
  updateTodo,
  toggleComplete,
  toggleErrorAction,
} from './helpers/actions';

const todo = document.querySelector('.todo__list');
const addBtn = document.querySelector('.todo__add-btn');
const input = document.querySelector('.todo-input');
const preloaderBlock = document.querySelector('.js-preloader');
const errorBlock = document.querySelector('.todo-error-js ');
const errorBtn = document.querySelector('.error-btn');

/**
 * Находит выбранную li в DOM
 * @param {Array, String}
 * allLi-массив todos
 * searchId - id e.target
 * @return {Object} найденная li
 */
function findCurrentIdElement(allLi, searchId) {
  return Array.prototype.find.call(allLi, elem => +elem.getAttribute('data-id') === searchId);
}

/**
 * Меняет состояние блока загрузки
 * @param {Boolean} condition состояние
 */
function togglePreloader(condition) {
  return condition
    ? preloaderBlock.classList.remove('hidden')
    : preloaderBlock.classList.add('hidden');
}

/**
 * Меняет состояние блока ошибки
 * @param {Boolean} condition состояние
 */
function toggleError(condition) {
  return condition ? errorBlock.classList.remove('hidden') : errorBlock.classList.add('hidden');
}

/**
 * Отрисовывает приложение на основе данных из стора
 * @param {Object}
 * store - хранилище данных
 */

function render({ todos, preloader, error }) {
  const html = tempalte({
    items: todos,
  });

  todo.innerHTML = html;

  togglePreloader(preloader);
  toggleError(error);
}

store.subscribe(() => {
  render(store.getState());
});

addBtn.addEventListener('click', () => {
  if (input.value === '') return;

  store.dispatch(
    addTodo({
      name: input.value,
    }),
  );

  input.value = '';
});

errorBtn.addEventListener('click', (e) => {
  e.preventDefault();

  store.dispatch(toggleErrorAction(false));
});
/**
 * Функция удаляет выбранную задачу
 * @param {object} e событие
 */
function deleteTask({ target }) {
  const deleteBtnId = +target.getAttribute('data-id');
  const currentStateElement = store.getState().todos.find(item => item.id === deleteBtnId);

  store.dispatch(delTodo(currentStateElement));
}
/**
 * Функция редактирует выбранную задачу
 * @param {object} e событие
 * @param {object} allLI все задачи
 *
 */
function editTask({ target }, allLi) {
  const editBtnId = +target.getAttribute('data-id');
  const currentLi = findCurrentIdElement(allLi, editBtnId);
  const currentStateElement = store.getState().todos.find(item => item.id === editBtnId);
  const CurrentInput = currentLi.querySelector('.todo__input');
  CurrentInput.value = currentStateElement.name;
  currentLi.classList.add('todo__item_mode_edit');
}
/**
 * Функция сохраняет новое название задачи выбранную задачу
 * @param {object} e событие
 * @param {object} allLI все задачи
 *
 */
function saveTask({ target }, allLi) {
  const saveBtnId = +target.getAttribute('data-id');
  const currentLi = findCurrentIdElement(allLi, saveBtnId);
  const id = +currentLi.getAttribute('data-id');
  const CurrentInput = currentLi.querySelector('.todo__input');
  const newValue = CurrentInput.value;

  store.dispatch(
    updateTodo({
      id,
      name: newValue,
    }),
  );

  currentLi.classList.remove('todo__item_mode_edit');
}
/**
 * Функция отмечает задачу как выбранную
 * @param {object} e событие
 *
 */
function toggleTask({ target }) {
  const checkBoxId = +target.getAttribute('data-id');
  store.dispatch(
    toggleComplete({
      id: checkBoxId,
    }),
  );
}

todo.addEventListener('click', (e) => {
  const allLi = document.querySelectorAll('.todo__item');
  if (e.target.classList.contains('todo__delete-btn')) {
    deleteTask(e);
  }

  if (e.target.classList.contains('js-edit-btn')) {
    editTask(e, allLi);
  }

  if (e.target.classList.contains('js-save-btn')) {
    saveTask(e, allLi);
  }

  if (e.target.classList.contains('js-checkbox')) {
    toggleTask(e);
  }
});

store.dispatch(getTodos());
