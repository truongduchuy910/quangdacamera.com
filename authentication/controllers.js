var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  require("./models")(passport);
  app.post(
    "/ad/signup",
    function(req, res, next) {
      next();
    },
    passport.authenticate("local-signup", {
      successRedirect: "/login",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );
  app.post(
    "/ad/login",
    passport.authenticate("local-login", {
      successRedirect: "/broadcast",
      failureRedirect: "/login",
      failureFlash: true
    })
  );
  //------------------------------------------------------------------------------------------------------------
  app.get("/ad/logout", function(req, res) {
    req.logout();
    res.redirect("/messenger/login");
  });
};
