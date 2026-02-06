const Todo = require('../models/todoModel');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.getAll();
        res.status(200).json({ status: 'success', data: todos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ message: 'Task is required' });
        
        const id = await Todo.create(task);
        res.status(201).json({ status: 'success', message: 'Created', id });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const doneTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({ message: 'Data not found' });
        
        await Todo.updateStatus(id, 'done');
        res.status(200).json({ status: 'success', message: 'Updated', id });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({ message: 'Data not found' });
        
        await Todo.delete(id);
        res.status(200).json({ status: 'success', message: 'Deleted', id });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// ... Tambahkan fungsi update & delete dengan pola yang sama
module.exports = { getTodos, createTodo, doneTodo, deleteTodo };