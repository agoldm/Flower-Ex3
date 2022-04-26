const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    color: { type: String },
    price: { type: String },
    description: { type: String },
});

const flowerModel = mongoose.model('flowers', flowerSchema);
exports.flowerModel = flowerModel;