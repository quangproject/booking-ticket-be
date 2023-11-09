const path = require('path')
const express = require('express')
const cors = require('cors');
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser');
require('dotenv').config()
const db = require('./config/db')
const route = require('./routes')

// Middleware for parsing JSON data
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// HTTP logger
app.use(morgan('combined'))

//Routes init
route(app)

//Connect to DB
try {
    db.connect();
    console.log('Connect database successfully!')
} catch (error) {
    console.log('Connect database fail!')
}

app.listen(process.env.PORT, function () {
    console.log("Access at http://localhost:%d in %s mode", this.address().port, app.settings.env);
});