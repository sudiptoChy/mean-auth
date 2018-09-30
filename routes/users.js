const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');



const User = require('../models/user');


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    
    User.addUser(newUser, (error, user) => {
        if(error) {
            res.json({success: false, message: 'Failed to register user'});
        } else {
            res.json({success: true, message: 'User registerd'})
        }
    })

});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});


module.exports = router;