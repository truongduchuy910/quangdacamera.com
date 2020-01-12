const request = require("request");
module.exports = app => {
  app.post("/api", (req, res) => {
    request(
      "http://localhost:3000/admin/api",
      {
        method: "post",
        json: {
          query: req.body.query
        }
      },
      (err, ress, body) => {
        res.send(body);
      }
    );
  });
};
