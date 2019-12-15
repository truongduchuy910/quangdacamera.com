var formidable = require("formidable");
var fs = require("fs");
var form = new formidable.IncomingForm();
var models = require("./models");
module.exports = app => {
  app
    .post("/products/detail", models.detail)
    .post("/products/add", productParse, models.add)
    .post("/products/edit", (req, res) => {})
    .post("/products/remove", (req, res) => {});
};
function productParse(req, res, next) {
  var path = `./products/upload/${Math.floor(
    Math.random() * Math.floor(999999999999)
  ).toString()}`;
  fs.mkdir(path, { recursive: true }, err => {
    if (err) throw err;
    form.uploadDir = path;
    form.keepExtensions = true;
    form.maxFieldsSize = 3 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
      if (err) throw err;
      fs.readdir(path, (err, files) => {
        if (err) throw err;
        var url = [];
        files.forEach(file => {
          url.push("/pd" + path.slice(17) + "/" + file);
        });
        req.product = {
          name: fields.name,
          price: fields.price,
          images: url
        };
        next();
      });
    });
  });
}
