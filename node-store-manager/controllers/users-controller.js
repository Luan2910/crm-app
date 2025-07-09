const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password')
    } catch (error) {
        return next(new HttpError('Fetching users failed, try again later.', 500))
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs for signup, please check your data.', 422))
    }
    const { name, email, password } = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return next(new HttpError('Signup failed, try again later.', 500))
    }

    if (existingUser) {
        return next(new HttpError('User already exists, please try to login', 422))
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://placehold.co/500x500?text=User\nPhoto',
        password, //TODO encryptation
        // products: []
    })

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signin failed, try again.', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return next(new HttpError('Signup failed, try again later.', 500))
    }

    if (!existingUser || existingUser.password !== password) {
        return next(new HttpError('Invalid credentials. Try Again.', 401))
    }

    res.json({ message: 'Login Successfull!' })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login