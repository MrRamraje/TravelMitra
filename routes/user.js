const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirect } = require("../middleware.js");
const {
  renderSignUpForm,
  signUpUser,
  renderLogInForm,
  logOutUser,
  logInUser,
} = require("../controllers/user.js");

router.route("/signup").get(renderSignUpForm).post(wrapAsync(signUpUser));

router
  .route("/login")
  .get(renderLogInForm)
  .post(
    saveRedirect,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    logInUser
  );


router.get("/logout", logOutUser);

module.exports = router;
