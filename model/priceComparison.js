// model/priceComparison.js
const mongoose = require('mongoose');

const priceComparisonSchema = new mongoose.Schema({
    productUrl: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports =mongoose.model('PriceComparison', priceComparisonSchema);
