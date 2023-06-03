const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'bello',
    password: 'bellobambo21',
    database: 'acme',
    port: 3306, // Update with the correct port number
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

app.get('/users', (req, res) => {
    const sql = `SELECT
    comments.body,
        posts.title,
        users.first_name,
        users.last_name
FROM comments
INNER JOIN posts on posts.id = comments.post_id
INNER JOIN users on users.id = comments.user_id
ORDER BY posts.title`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing the query:', err);
            res.status(500).send('Error retrieving users');
            return;
        }

        res.send(result);
    });
});

app.listen(5000, () => console.log('Server Started'));

//synchronizing database