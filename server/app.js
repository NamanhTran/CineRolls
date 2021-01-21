const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const config = require('config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const searchRoutes = require('./routes/searchRoutes');

app.use(searchRoutes);

app.listen(config.get('devlopment_port'));