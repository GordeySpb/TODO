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

	res.json({success: true});
});

router.post('/api/updateTodo', (req, res, next) => {
	const todo = req.body;


	todos = todos.map((item) => {
		if (item.id === todo.id) {
			item.name = todo.name;
		}

		return item;
	});

	res.json({success: true});
});

router.post('/api/toggleComplete', (req, res, next) => {
	const todo = req.body;

	todos = todos.map((item) => {
		if (item.id === todo.id) {
			item.completed = !item.completed;
		}

		return item;
	});

	res.json({success: true});
})







/**
 * Getting todos
 */
router.get('/api/getTodos', (req, res, next) => {
	res.json(todos);
});

module.exports = router;
