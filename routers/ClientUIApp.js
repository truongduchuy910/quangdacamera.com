module.exports = function(app, keystone) {
  app
    .get("/", async (req, res) => {
      const data = await keystone.executeQuery(`query {
        allCategories {
          name
        }
      }`);
      console.log(data);
      res.render("pages/home", JSON.parse(JSON.stringify(data)));
    })
    .get("/catalog", (req, res) => {})
    .get("/product", (req, res) => {})
    .get("/news", (req, res) => {})
    .get("/post", (req, res) => {})
    .get("/checkout", (req, res) => {});
};
