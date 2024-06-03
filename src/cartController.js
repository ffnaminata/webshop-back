const Cart = require('./cart.js');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('products.product');
        res.json({ cart });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const addToCart = async (req, res) => {
    const { id } = req.params;
    try {
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart();
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === id);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: id });
        }

        await cart.save();

        await cart.populate('products.product');
        res.json({ cart });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const removeFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findOne();
        const productIndex = cart.products.findIndex(p => p.product.toString() === id);
        if (productIndex > -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            } else {
                cart.products.splice(productIndex, 1);
            }
        }

        await cart.save();

        await cart.populate('products.product');
        res.json({ cart });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const getCartSummary = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('products.product');
        if (!cart || !cart.products) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const total_price = cart.products.reduce((acc, item) => {
            if (item.product && item.product.price) {
                return acc + item.quantity * item.product.price;
            } else {
                return acc;
            }
        }, 0);

        const nbr_product = cart.products.reduce((acc, item) => acc + item.quantity, 0);
        res.json({ total_price, nbr_product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};


module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    getCartSummary
};
