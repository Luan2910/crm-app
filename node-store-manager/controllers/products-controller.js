const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error')
const Product = require('../models/product')
const User = require('../models/user')

const getProductById = async (req, res, next) => {
    const productId = req.params.pid;
    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
        const error = new HttpError('Could not find a product. Something went wrong.', 500)
        return next(error)
    }

    if (!product) { return next(new HttpError('Could not find a product for the provided id.', 404)); }
    res.json({
        product: product.toObject({ getters: true })
    });
}

const getProductsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let products;
    try {
        products = await Product.find({ owner: userId })
    } catch (err) {
        const error = new HttpError('Could not find a product. Something went wrong.', 500)
        return next(error)
    }

    if (!products || products.length === 0) {
        return next(new HttpError('Could not find products for the provided user id.', 404));
    }
    res.json({ product: products.map(product => product.toObject({ getters: true })) })
}

const createProduct = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(HttpError('Invalid inputs, please check your data.', 422))
    }

    const { title, description, price, owner } = req.body;

    const createdProduct = new Product({
        title,
        description,
        price,
        image: 'https://placehold.co/500x500?text=Hello\nWorld',
        owner
    })

    let user;
    try {
        user = await User.findById(owner)
    } catch (error) {
        return next(new HttpError('Creating product failed, user search failed.', 500));
    }

    if (!user) {
        return next(new HttpError('Creating product failed, no user found with the provided id.', 500));
    }

    try {
        await createdProduct.save();
    } catch (err) {
        return next(new HttpError('Creating product failed, try again.', 500));
    }

    res.status(201).json({ product: createdProduct });
}

const updateProduct = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(HttpError('Invalid inputs for update, please check your data.', 422))
    }

    const { title, description } = req.body;
    const productId = req.params.pid;

    let product;
    try {
        product = await Product.findById(productId)
    } catch (err) {
        return next(new HttpError('Could not update a product for the provided id.', 500));
    }

    product.title = title;
    product.description = description;

    try {
        await product.save();
    } catch (error) {
        return next(new HttpError('Could not update a product.', 500));
    }

    res.status(200).json({ product: product.toObject({ getters: true }) })
}

const deleteProduct = async (req, res, next) => {
    const productId = req.params.pid;

    try {
        const deletedProduct = await Product.deleteOne({ _id: productId })

        if (deletedProduct) {
            console.log('Product deleted successfully:', deletedProduct);
        } else {
            console.log('No product found with the given ID.');
        }
    } catch (error) {
        return next(new HttpError('Could not delete a product for the provided id.', 500));
    }

    res.status(200).json({ message: `Deleted product with id: ${productId}.` })
}

exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;