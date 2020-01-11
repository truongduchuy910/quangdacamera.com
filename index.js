const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const initialiseData = require("./initial-data");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const PROJECT_NAME = "quangdacamera.com";
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
  onConnect: initialiseData
});

const { Wit, log } = require("node-wit");

const client = new Wit({
  accessToken: "BRYW2MYXA7KTY72ZOSKVUM7GHXCBR23U",
  logger: new log.Logger(log.DEBUG) // optional
});

keystone.createList("User", require("./lists/users"));
keystone.createList("Hashtag", require("./lists/hashtags"));
keystone.createList("Category", require("./lists/categories"));
keystone.createList("Post", require("./lists/posts"));
keystone.createList("Product", require("./lists/products"));
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User"
});
module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy
    })
  ],
  configureExpress: app => {
    const express = require("express");
    const path = require("path");
    // const bodyParser = require("body-parser");
    // const logger = require("morgan");
    app.use(express.static(path.join(__dirname, "public")));
    app.set("views", "./views");
    app.set("view engine", "ejs");
    app.get("/:url", (req, res) => {
      console.log(client.message(req.params.url.replace(/-/g, " ")));
      keystone
        .executeQuery(
          `
          query {
            allUsers {
              id
            }
          }
        `
        )
        .then(data => {
          res.render("pages/home", JSON.parse(JSON.stringify(data)));
        });
    });
  }
};
