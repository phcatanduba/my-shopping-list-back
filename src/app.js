import express from 'express';
import cors from 'cors';

import connection from './database.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/items', async (req, res) => {
    try {
        const request = await connection.query('SELECT * FROM items');
        res.send(request.rows);
    } catch (e) {
        console.log(e);
    }
});

app.post('/items', async (req, res) => {
    try {
        const request = await connection.query(
            'INSERT INTO items (text) values ($1)',
            [req.body.text]
        );
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
    }
});

export default app;
