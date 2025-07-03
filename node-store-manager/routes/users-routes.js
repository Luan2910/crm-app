const express = require('express');
const { check } = require('express-validator')

const usersControlers = require('../controllers/users-controller')

const router = express.Router();

router.get('/', usersControlers.getUsers);

router.post('/signup',
    [
        check('name').notEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ],
    usersControlers.signup);

router.post('/login', usersControlers.login);


module.exports = router;