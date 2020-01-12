const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");

const initialiseData = require("./initial-data");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const PROJECT_NAME = "quangdacamera.com";
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new MongooseAdapter({
    mongoUri: "mongodb://localhost:27017/quangdacamera-com?retryWrites=true"
  }),
  onConnect: initialiseData,
  secureCookies: false
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
    }),
  ]
};
