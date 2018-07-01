import './scss/main.scss';
import tempalte from './templates/todo.hbs';
import pubSub from './helpers/pubsub.js';




const todo = document.querySelector('.todo__list');
const addBtn = document.querySelector('.todo__add-btn');
const saveBtn = document.querySelector('.todo__save-btn');
const input = document.querySelector('.todo-input');


let store = [];
let inputValue = '';


function addToStore(item) {
    store.push(item);

    pubSub.emit('update')
}

function render() {
    const html = tempalte({
        items: store
    })

    todo.innerHTML = html;
}


input.addEventListener('keyup', e => {
    inputValue = e.target.value;

})

todo.addEventListener('click', e => {
    const li = document.querySelector('.todo__item');
    const id = li.getAttribute('data-id');
    const allLi = document.querySelectorAll('.todo__item');


    if (e.target.classList.contains('todo__delete-btn')) {
        pubSub.emit('delTask', id)

    }


    if (e.target.classList.contains('js-edit-btn')) {
        const editBtnId = +e.target.getAttribute('data-id');
        const currentLi = findCurrentIdElement(allLi, editBtnId);
        const currentStateElement = store.find(todo => todo.id === editBtnId);
        const input = currentLi.querySelector('.todo__input');

        input.value = currentStateElement.name;
        currentLi.classList.add('todo__item_mode_edit');
    }


    if (e.target.classList.contains('js-save-btn')) {
        const saveBtnId = +e.target.getAttribute('data-id');
        const currentLi = findCurrentIdElement(allLi, saveBtnId);

        currentLi.classList.remove('todo__item_mode_edit');
        
    }

})

function findCurrentIdElement(allLi, searchId) {
    return Array.prototype.find.call(allLi, (elem) => {
        return +elem.getAttribute('data-id') === searchId;
    })
}





function deleteTask(id) {
    store = store.filter(elem => elem.id !== +id)

    pubSub.emit('update')
}


addBtn.addEventListener('click', e => {
    if (inputValue === '') return;

    pubSub.emit('addTodo', {
        name: inputValue,
        id: Date.now()
    })

    input.value = '';

})


pubSub.subscribe('addTodo', addToStore);
pubSub.subscribe('delTask', deleteTask);
// pubSub.subscribe('editTask', editTask)
pubSub.subscribe('update', render);