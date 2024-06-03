const express = require('express');
const { 
    getCart, 
    addToCart, 
    removeFromCart, 
    getCartSummary 
} = require('./cartController.js');

const router = express.Router();

router.get('/', getCart);
router.post('/add/:id', addToCart);
router.post('/remove/:id', removeFromCart);
router.get('/summary', getCartSummary);

module.exports = router;