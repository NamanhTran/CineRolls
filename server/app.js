const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const session =  require('express-session');
const mongoSession = require('connect-mongodb-session')(session);
const cors = require('cors');
const config = require('config');

// SSL Cert for HTTPS
const sslOptions = {
    key: fs.readFileSync('./security/key.pem'),
    cert: fs.readFileSync('./security/cert.pem')
};

// MongoDB connection utility function
const { databaseConnection } = require('./utils/database');

// Initalizes express
const app = express();

// Initalizes express-session
const sessionStore = new mongoSession({
    uri: config.get('DB_URL'),
    collection: 'sessions'
});

// Enables cors for all requests
app.use(cors({ credentials: true, origin:['http://localhost:3000', 'https://localhost:3000'], exposedHeaders: ['set-cookie'] }));

// Express-session config
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

// Parse body requests as JSON
app.use(bodyParser.json());

// Declare and use the server's routes
const authRoutes = require('./routes/authenticateRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(authRoutes);
app.use(searchRoutes);

// Make sure there is a database connection then listen on the specified port
databaseConnection(() => {
    https.createServer(sslOptions, app).listen(config.get('devlopment_port'));
});