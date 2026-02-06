const express = require('express');
const mysql = require('mysql2');
const app = express();

//Init express
app.use(express.json());

//connect mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@WebDev25',
    database: 'node_todo',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!')
});

// routes

// 1. GET : show all todo list
app.get('/todos', (req, res) => {
    db.query("SELECT * FROM todos", (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// 2. POST : insert new todo
app.post('/todos', (req, res) => {
    const { task } = req.body;
    db.query("INSERT INTO todos (task) VALUES (?)", [task], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({
            message: 'New Todo Inserted Successfully!', 
            id : result.insertId
        });
    });
});

// 3. PUT : Update todo status
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query("UPDATE todos SET status = 'done' WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({
            message: 'Todo is done!',
            id: id
        });
    });
});

// 4. DELETE : delete todo from todolist
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({
            message: 'Todo is deleted!',
            id: id
        });
    });
});

app.listen(3033, () => console.log('Server running on http://localhost:3033'));

