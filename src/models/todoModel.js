const db = require('../config/db');

class TodoModel {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
        return rows;
    }

    static async create(task) {
        const [result] = await db.query('INSERT INTO todos (task) VALUES (?)', [task]);
        return result.insertId;
    }

    static async updateStatus(id, status) {
        await db.query('UPDATE todos SET status = ? WHERE id = ?', [status, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM todos WHERE id = ?', [id]);
    }
}

module.exports = TodoModel;