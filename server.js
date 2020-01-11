const express = require("express");
const { keystone, apps } = require("./index.js");
const path = require("path");
// const bodyParser = require("body-parser");
// const logger = require("morgan");
const { Wit, log } = require("node-wit");
const client = new Wit({
  accessToken: "BRYW2MYXA7KTY72ZOSKVUM7GHXCBR23U",
  logger: new log.Logger(log.DEBUG) // optional
});

keystone
  .prepare({ apps, dev: process.env.NODE_ENV !== "production" })
  .then(async ({ middlewares }) => {
    await keystone.connect();
    const app = express();
    app.use(express.static(path.join(__dirname, "public")));
    app.set("views", "./views");
    app.set("view engine", "ejs");
    require("./routers/ClientUIApp")(app, keystone);

    app.use(middlewares).listen(1337);
  });
