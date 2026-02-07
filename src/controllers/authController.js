const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);
    
    try {
        await db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, encryptedPassword]);
        res.status(201).json(
            {
                message: 'User berhasil didaftarkan',
            }
        );
    } catch {
        res.status(400).json(
            {
                message: 'Username sudah digunakan',
            }
        );
    }
};

const login = async (req, res) => {
    const {username, password} = req.body;

    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if(users.length > 0 && await bcrypt.compare(password, users[0].password)) {
        const token = jwt.sign({
            id: users[0].id,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({
            token
        });
    } else {
        res.status(401).json({
            message: 'Username atau password salah'
        });
    }
};

module.exports = {register, login};