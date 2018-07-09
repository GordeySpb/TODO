const express = require('express');
const router = express.Router();

let todos = [];

/**
 * Method for adding todo
 */
router.post('/api/addTodo', (req, res, next) => {
	const todo = req.body;

	todos = [...todos, todo],

	res.json(todos);
});

/**
 * Получение массива todo
 */
router.get('/api/getTodos', (req, res, next) => {
	res.json(todos);
});

module.exports = router;
