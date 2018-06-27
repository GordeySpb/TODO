import './scss/main.scss';
import tempalte from './templates/todo.hbs';
import pubSub from './helpers/pubsub.js';




const todo = document.querySelector('.todo__list');
const addBtn = document.querySelector('.todo__add-btn');
const saveBtn = document.querySelector('.todo__save-btn');
const editBtn = document.querySelector('.todo__edit-btn');
const deleteBtn = document.querySelector('.todo__delete-btn');
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
    if (e.target.classList.contains('todo__delete-btn')) {
        const li = e.target.closest('li');
        const id = li.getAttribute('data-id');
        pubSub.emit('delTask', id)
            
    }

    if (e.target.classList.contains('todo__edit-btn')) {
        const editBtn = e.target;
        editBtn.innerText = 'Save';

        const editInput = editBtn.previousElementSibling;
        editInput.classList.toggle('hidden');

        const taskName = editInput.previousElementSibling;
        taskName.classList.toggle('hidden');
        
        const editTaskName = editInput.value;
        
        taskName.innerText = editTaskName;
        
    }

})



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
pubSub.subscribe('update', render);



