const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error')

let PRODUCTS = [
    {
        id: 'p1',
        title: 'Product One',
        description: 'Product with nice description and good size',
        owner: 'u1'
    },
    {
        id: 'p2',
        title: 'Product Two',
        description: 'Product with nice description and good size',
        owner: 'u2'
    },
    {
        id: 'p3',
        title: 'Product Three',
        description: 'Product with nice description and good size',
        owner: 'u1'
    }
]

const getProductById = (req, res, next) => {
    const productId = req.params.pid;
    const product = PRODUCTS.find(p => {
        return p.id === productId;
    });
    if (!product) { return next(new HttpError('Could not find a product for the provider id.', 404)); }
    res.json({ product });
}

const getProductsByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const products = PRODUCTS.filter(p => {
        return p.owner === userId;
    })
    if (!products || products.length === 0) {
        return next(new HttpError('Could not find products for the provider user id.', 404));
    }
    res.json({ products });
}

const createProduct = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs, please check your data.', 422)
    }

    const { title, description, owner } = req.body;

    const createdProduct = {
        id: uuidv4(),
        title,
        description,
        owner
    };

    PRODUCTS.push(createdProduct);

    res.status(201).json({ product: createdProduct });
}

const updateProduct = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs for update, please check your data.', 422)
    }

    const { title, description } = req.body;
    const productId = req.params.pid;
    const updatedProduct = { ...PRODUCTS.find(p => p.id === productId) }
    if (!updatedProduct) { return next(new HttpError('Could not find a product for the provider id.', 404)); }

    const productIndex = PRODUCTS.findIndex(p => p.id === productId)
    updatedProduct.title = title;
    updatedProduct.description = description;

    PRODUCTS[productIndex] = updatedProduct;

    res.status(200).json({ product: updatedProduct })
}

const deleteProduct = (req, res, next) => {
    const productId = req.params.pid;
    if (!PRODUCTS.find(p => p.id === productId)) {
        throw new HttpError('Could not find a product for the provider id.', 404)
    }
    PRODUCTS = PRODUCTS.filter(p => p.id !== productId)
    res.status(200).json({ message: `Deleted place with id: ${productId}.` })
}

exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;