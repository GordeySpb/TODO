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

	setTimeout(() => {
		res.json(todo);
	},300)
});

router.post('/api/delTodo', (req, res, next) => {
	const todo = req.body;

	todos = todos.filter((elem) => elem.id !== todo.id);

	setTimeout(() => {
		res.json({success: true});
	}, 300)
});

router.post('/api/updateTodo', (req, res, next) => {
	const todo = req.body;


	todos = todos.map((item) => {
		if (item.id === todo.id) {
			item.name = todo.name;
		}

		return item;
	});

	const newTodo = todos.find((elem) => elem.id === todo.id);

	setTimeout(() => {
		res.json({success: true, todo: newTodo});
	}, 300)
});

router.post('/api/toggleComplete', (req, res, next) => {
	const todo = req.body;

	todos = todos.map((item) => {
		if (item.id === todo.id) {
			item.completed = !item.completed;
		}

		return item;
	});

	const newTodo = todos.find((elem) => elem.id === todo.id);

	setTimeout(() => {
		res.json({success: false, todo: newTodo});
	}, 300)
})




/**
 * Getting todos
 */
router.get('/api/getTodos', (req, res, next) => {

	setTimeout(()=> {
		res.json(todos);
	},500)
});

module.exports = router;
