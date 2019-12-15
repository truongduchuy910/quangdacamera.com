var PORT = process.env.PORT || 7000;
var express = require("express");
var app = express();
var server = require("http").Server(app);
var path = require("path");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/heroku_g4vd37n3?retryWrites=true",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("connect successful!");
    } else {
      throw err;
    }
  }
);
server.listen(PORT);
app
  .use(express.static(path.join(__dirname, "client/public")))
  .use("/pd", express.static(path.join(__dirname, "products/upload")))
  .use("/ad", express.static(path.join(__dirname, "admin/public")))
  .set("views", [path.join(__dirname, "admin"), path.join(__dirname, "client")])
  .set("view engine", "ejs")
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: false
    })
  )
  .use(
    session({
      secret: "Truongduchuy910."
    })
  )
  .use(flash());

require("./products/controllers")(app);
require("./client/controllers")(app);
require("./admin/controllers")(app);
require("./authentication/controllers")(app);
app.get("*", function(req, res) {
  res.render("views/404");
});
