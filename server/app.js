const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const session =  require('express-session');
const mongoSession = require('connect-mongodb-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('config');

const sslOptions = {
    key: fs.readFileSync('./security/key.pem'),
    cert: fs.readFileSync('./security/cert.pem')
};

const { databaseConnection } = require('./utils/database');

const app = express();
const sessionStore = new mongoSession({
    uri: config.get('DB_URL'),
    collection: 'sessions'
});
app.use(cookieParser());
app.use(cors({ credentials: true, origin:['http://localhost:3000', 'https://localhost:3000'], exposedHeaders: ['set-cookie'] }));
app.use(session({
    secret: config.get('SESSION_SECRET'),
    resave: false, 
    saveUninitialized: false, 
    store: sessionStore,
    unset: 'destroy',
    cookie: {
        maxAge: 600000,
        secure: true
    } 
}));
app.use(bodyParser.json());

const authRoutes = require('./routes/authenticateRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(authRoutes);
app.use(searchRoutes);

databaseConnection(() => {
    https.createServer(sslOptions, app).listen(config.get('devlopment_port'));
});