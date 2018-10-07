const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect to Database
mongoose.connect(config.database, {useNewUrlParser: true});

// On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
})

// On Error
mongoose.connection.on('error', (error) => {
    console.log('Database Error ' + error);
})


const app = express();

const users = require('./routes/users');

// Port Number
const port = 3002;

// Cros Origin Resource Sharing Middleware (cors)
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);


// Index Route
app.get('/', (req, res) => {
    res.send('Hello there');
})


app.use('/users', users);


// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
})