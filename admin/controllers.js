module.exports = app => {
  app
    .get("/ad/login", (req, res) => {
      res.render("views/login", { message: req.flash("login") });
    })
    .get("/ad/dashboard", (req, res) => {
      res.render("views/dashboard");
    })
    .get("/ad/add-product", (req, res) => {
      res.render("views/add-product");
    })
    .get("/ad/edit-product", (req, res) => {
      res.render("views/edit-product");
    })
    .get("/ad/remove-product", (req, res) => {
      res.render("views/remove-product");
    })
    .get("/ad/list-product", (req, res) => {
      res.render("views/list-product");
    })
    .get("/ad/detail-product/", (req, res) => {
      res.render("views/detail-product");
    })
    .get("/ad/add-post", (req, res) => {
      res.render("views/add-post");
    })
    .get("/ad/edit-post", (req, res) => {
      res.render("views/edit-post");
    })
    .get("/ad/remove-post", (req, res) => {
      res.render("views/remove-post");
    })
    .get("/ad/list-post", (req, res) => {
      res.render("views/list-post");
    })
    .get("/ad/new-order", (req, res) => {
      res.render("views/new-order");
    })
    .get("/ad/list-order", (req, res) => {
      res.render("views/list-order");
    })
    .get("/ad/upload-image", (req, res) => {
      res.render("views/upload-image");
    })
    .get("/ad/remove-image", (req, res) => {
      res.render("remove-image");
    });
};
