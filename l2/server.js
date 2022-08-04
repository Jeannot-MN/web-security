const express = require('express');
const { createReadStream } = require('fs');
const bordyParser = require('body-parser');

const USERS = {
    'admin': 'admin',
    'john': 'password'
}

const app = express();
app.use(bordyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    createReadStream('index.html').pipe(res);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const validPassword = USERS[username];

    if (password === validPassword) {
        res.cookie('username', username);
        res.send('nice');
    } else {
        res.send('fail');
    }

});

app.listen(4444, () => {
    console.log("Server listening on port 4444");
});