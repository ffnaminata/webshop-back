const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    desc:  {type: String, require: true}
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product

