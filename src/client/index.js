import './styls/main.scss';
import tempalte from './templates/todo.hbs';
import store from './helpers/store';
import {addTodosAction, addTodoAction, deleteAction, updateAction, asyncGetTodosAction} from './helpers/actions';



const todo = document.querySelector('.todo__list');
const addBtn = document.querySelector('.todo__add-btn');
const input = document.querySelector('.todo-input');
const preloader = document.querySelector('.js-preloader');



store.subscribe(() => {
    render(store.getState());
    saveToLocalStorage(store);
});


try {
    const todos = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
    store.dispatch(addTodosAction(todos))
} catch (e) {
    console.log(e)
}


function render(store) {
    const html = tempalte({
        items: store.todos
    })

    

    togglePreloader(store.preloader);
    todo.innerHTML = html;

};



addBtn.addEventListener('click', e => {
    if (input.value === '') return;

    store.dispatch(addTodoAction({
        name: input.value,
        id: Date.now()
    }))
    
      
    input.value = '';
    
});


todo.addEventListener('click', e => {
    const allLi = document.querySelectorAll('.todo__item');


    if (e.target.classList.contains('todo__delete-btn')) {
        const deleteBtnId = +e.target.getAttribute('data-id');

        store.dispatch(deleteAction({
            id: deleteBtnId
        }))

    }


    if (e.target.classList.contains('js-edit-btn')) {
        const editBtnId = +e.target.getAttribute('data-id');
        const currentLi = findCurrentIdElement(allLi, editBtnId);
        const currentStateElement = store.getState().todos.find(todo => todo.id === editBtnId);
        const input = currentLi.querySelector('.todo__input');
        input.value = currentStateElement.name;
        currentLi.classList.add('todo__item_mode_edit');
    }


    if (e.target.classList.contains('js-save-btn')) {
        const saveBtnId = +e.target.getAttribute('data-id');
        const currentLi = findCurrentIdElement(allLi, saveBtnId);
        const id = +currentLi.getAttribute('data-id');
        const input = currentLi.querySelector('.todo__input');
        const newValue = input.value;

        store.dispatch(updateAction({
            name: newValue,
            id: id
        }))


        currentLi.classList.remove('todo__item_mode_edit');


    }

    if (e.target.classList.contains('js-checkbox')) {
        const checkBoxId = +e.target.getAttribute('data-id');
        const currentLi = findCurrentIdElement(allLi, checkBoxId);
        currentLi.classList.toggle('checked');
    }

})


function findCurrentIdElement(allLi, searchId) {
    return Array.prototype.find.call(allLi, (elem) => {
        return +elem.getAttribute('data-id') === searchId;
    })
};




function saveToLocalStorage() {
    const list = JSON.stringify(store.getState().todos);
    localStorage.setItem('list', list)
};

function togglePreloader(condition) {  
    condition ? preloader.classList.remove('hidden') :  preloader.classList.add('hidden');
};

store.dispatch(asyncGetTodosAction())




