const express = require('express');
const { check } = require('express-validator')

const productsControlers = require('../controllers/products-controller')

const router = express.Router();

router.get('/:pid', productsControlers.getProductById);

router.get('/user/:uid', productsControlers.getProductsByUserId);

router.post('/',
    [
        check('title').notEmpty(),
        check('description').isLength({ min: 5 })
    ],
    productsControlers.createProduct);

router.patch('/:pid',
    [
        check('title').notEmpty(),
        check('description').isLength({ min: 5 })
    ],
    productsControlers.updateProduct);

router.delete('/:pid', productsControlers.deleteProduct);

module.exports = router;