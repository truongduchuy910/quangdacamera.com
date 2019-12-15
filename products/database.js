var mongoose = require("mongoose");

module.exports = {
  products: mongoose.model(
    "products",
    mongoose.Schema({
      url: String,
      images: [String],
      name: String,
      price: String,
      sale: String,
      category: String,
      brand: String,
      quill: String,
      html: String
    })
  ),
  categories: mongoose.model(
    "categories",
    mongoose.Schema({
      name: String
    })
  )
};
