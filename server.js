const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { keystone, apps } = require("./index.js");
keystone
  .prepare({ apps, dev: process.env.NODE_ENV !== "production" })
  .then(async ({ middlewares }) => {
    await keystone.connect();
    const clientUI = express();
    clientUI.use(middlewares).listen(3000);
    clientUI.use(logger("dev"));
    clientUI.use(bodyParser.json());
    clientUI.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    
  });
