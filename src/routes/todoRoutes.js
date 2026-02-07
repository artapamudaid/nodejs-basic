const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authController = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

//Public Routes

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/', protect, todoController.getTodos);
router.post('/', protect, todoController.createTodo);
router.put('/:id', protect, todoController.doneTodo);
router.delete('/:id', protect, todoController.deleteTodo)

module.exports = router;