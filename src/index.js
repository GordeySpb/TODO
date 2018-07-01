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
        
        Array.prototype.forEach.call(allLi, (elem) => {
            let elemID = +elem.getAttribute('data-id');

            if (elemID === editBtnId) {
                const editInput = elem.querySelector('.todo__input');
                editInput.classList.toggle('hidden');

                const editBtn = elem.querySelector('.js-edit-btn');
                editBtn.classList.add('hidden');

                const saveBtn = elem.querySelector('.js-save-btn');
                saveBtn.classList.remove('hidden');

                const taskName = elem.querySelector('.todo__name');
                taskName.classList.toggle('hidden');
            }

            return elem
        })


    }


    if (e.target.classList.contains('js-save-btn')) {
        

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
// pubSub.subscribe('editTask', editTask)
pubSub.subscribe('update', render);