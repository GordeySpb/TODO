import './scss/main.scss';
// import render from './templates/todo.hbs';
// console.log(render)

const store = [
    {
        name: 'item 1'
    },

    {
        name: 'item 2'
    },

    {
        name: 'item 3'
    },
];

const todo = document.querySelector('.todo__list');
const addBtn = document.querySelector('.todo__add-btn');
const saveBtn = document.querySelector('.todo__save-btn');
const editBtn = document.querySelector('.todo__edit-btn');
const deleteBtn = document.querySelector('.todo__delete-btn');

function creatItem(item) {
    const li = document.createElement('li');
    li.classList.add('todo__item');

    const name = document.createElement('div');
    name.classList.add('todo__name');
    name.innerText = item.name;

    const edBtn = document.createElement('button');
    edBtn.classList.add('btn', 'todo__edit-btn');
    edBtn.innerText = 'edit';

    const delBtn = document.createElement('button');
    delBtn.classList.add('btn', 'todo__delete-btn');
    delBtn.innerText = 'delete';

    li.appendChild(name);
    li.appendChild(edBtn);
    li.appendChild(delBtn);

    return li;
};

function renderList(list) {
    list.innerHTML = '';
    list.forEach(item => {
       const li = creatItem(item)

        todo.appendChild(li);
    });

}
// render({
//     items : store
// })
renderList(store)

