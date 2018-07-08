import './scss/main.scss';
import tempalte from './templates/todo.hbs';
import pubSub from './helpers/pubsub.js';
import store from './helpers/store';
import {addTodosAction, addTodoAction, deleteAction, updateAction} from './helpers/actions';
import {ADD_TODOS, ADD_TODO, DELETE, UPDATE} from './helpers/actions';



const todo = document.querySelector('.todo__list');
const addBtn = document.querySelector('.todo__add-btn');
const input = document.querySelector('.todo-input');




function render(store) {
    const html = tempalte({
        items: store
    })

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
        const currentStateElement = store.getState().find(todo => todo.id === editBtnId);
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

})


function findCurrentIdElement(allLi, searchId) {
    return Array.prototype.find.call(allLi, (elem) => {
        return +elem.getAttribute('data-id') === searchId;
    })
}

store.subscribe(() => {
    render(store.getState());
});


// function saveToStore(data) {
//     const {
//         id,
//         newValue
//     } = data;

//     store = store.map(elem => {
//         if (elem.id === id) {
//             elem.name = newValue;
//             elem.id = id
//         }

//         return elem;
//     })

//     pubSub.emit('updated', {
//         store
//     });
// }





// function saveToLocalStorage() {
//     const list = JSON.stringify(store);
//     localStorage.setItem('list', list)

// };

// function updated(store) {
//     render(store);
//     saveToLocalStorage(store);
// }






// pubSub.subscribe('onLoad', onLoadHandler);
// pubSub.subscribe('editTodo', saveToStore);
// pubSub.subscribe('addTodo', addToStore);
// pubSub.subscribe('delTask', deleteTask);
// pubSub.subscribe('saveToStorage', saveToLocalStorage);
// pubSub.subscribe('updated', updated);
// pubSub.emit('onLoad');