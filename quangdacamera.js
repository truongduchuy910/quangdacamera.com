const express = require("express");
const path = require("path");
const config = require("./config");
const PORT = config.PORT.frontend;
const app = express();
const logger = require("morgan");
var flash = require("connect-flash");
var session = require("express-session");
const bodyParser = require("body-parser");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "quangdacamera.com" }));
app.use(flash());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend"));
require("./frontend/api/controllers")(app);
require("./frontend/home/controllers")(app);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
