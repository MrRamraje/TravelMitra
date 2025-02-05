const User = require("../models/user.js");

module.exports.renderSignUpForm=(req, res) => {
    res.render("user/signup.ejs");
  };

module.exports.signUpUser=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        // console.log(registeredUser);
        req.flash("success", "Welcome to TravelMitra");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };

module.exports.renderLogInForm=(req, res) => {
    res.render("user/login.ejs");
  };

module.exports.logInUser=async (req, res) => {
    req.flash("success", "Welcome to TravelMitra");
    let redirectUrl = res.locals.redirect || "/listings";
    res.redirect(redirectUrl);
  };

module.exports.logOutUser=(req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are Logged Out!");
      res.redirect("/listings");
    });
  };