const express = require('express');
const router = express.Router();

let todos = [];


/**
 * Method for adding todo
 */
router.post('/api/addTodo', (req, res, next) => {
	const name = req.body.name;
	
	const todo = {
		id: Date.now(),
		name: name,
		completed: false
	};

	todos = [...todos, todo],

	res.json(todo);
});

router.post('/api/delTodo', (req, res, next) => {
	const todo = req.body;

	todos = todos.filter((elem) => elem.id !== todo.id);

	res.json(todo);
});

router.post('/api/updateTodo', (req, res, next) => {
	const todo = req.body;

	todos = todos.map((elem) => {
		if (elem.id === todo.id) {
			elem.name = todo.name;
		}

		return elem
	});

	res.json(todo);
});







/**
 * Getting todos
 */
router.get('/api/getTodos', (req, res, next) => {
	res.json(todos);
});

module.exports = router;