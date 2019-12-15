var db = require("./database");
module.exports = {
  add: function(req, res) {
    if (req.product && req.product.name) {
      var name = req.product.name;
      var url = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/ /g, "-");
      var price = req.product.price;
      db.products.find(
        {
          url: url
        },
        (err, docs) => {
          if (!docs.length) {
            db.products.insertMany(
              {
                url: url,
                name: name,
                price: price
              },
              (err, docs) => {
                res.redirect("/ad/detail-product?p=" + docs[0].url);
              }
            );
          } else {
            res.redirect("/ad/detail-product?p=" + docs[0].url);
          }
        }
      );
    }
  },
  detail: (req, res) => {
    console.log(req.query);
    res.send("OK");
  }
};
