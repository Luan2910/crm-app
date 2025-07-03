const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error')

const USERS = [
    {
        id: 'u1',
        name: 'Test User 1',
        email: 'test@test.com',
        password: '123'
    }
]

const getUsers = (req, res, next) => {
    res.json({ users: USERS })
}

const signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs for signup, please check your data.', 422)
    }
    const { name, email, password } = req.body

    const hasUser = USERS.find(u => u.email === email)
    if (hasUser) {
        throw new HttpError('Could not create this user, email already in use.', 422)
    }
    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }

    USERS.push(createdUser)
    res.status(201).json({ user: createdUser })
}

const login = (req, res, next) => {
    const { email, password } = req.body

    const user = USERS.find(u => u.email === email)
    if (!user || user.password !== password) {
        throw new HttpError('Could not find user with this credentials.', 401)
    }

    res.json({ message: 'Login Successfull!' })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login