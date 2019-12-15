var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    images: [String],
    name: String,
    price: String,
    sale: String,
    category: String,
    brand: String,
    quill: String,
    html: String,
});
module.exports = mongoose.model('products', userSchema); 