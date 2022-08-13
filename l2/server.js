const express = require('express');
const { createReadStream } = require('fs');
const bordyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const USERS = {
    'admin': 'admin',
    'john': 'password'
}

const BALANCES = {
    'admin': 459.99
}

const COOKIE_SECRET = "ThisIsACookieSecret";

const app = express();
app.use(bordyParser.urlencoded({ extended: true }))
app.use(cookieParser(COOKIE_SECRET));

app.get('/', (req, res) => {
    const { username } = req.signedCookies;

    if (username && USERS[username]) {
        res.send(`Hi ${username}! Your balance is ${BALANCES[username]}`);
    } else {
        res.clearCookie('username');
        createReadStream('index.html').pipe(res);
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const validPassword = USERS[username];

    if (password === validPassword) {
        res.cookie('username', username, { signed: true });
        res.redirect("/");
    } else {
        res.send('fail');
    }

});

app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
})

app.listen(4444, () => {
    console.log("Server listening on port 4444");
});