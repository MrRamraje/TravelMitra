if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrors.js");
const listingsRoute = require("./routes/listings.js");
const reviewRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
//ejs
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate); //ejs-mate


const dbUrl=process.env.ATLASDB_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
      secret : process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true, // Set saveUninitialized option
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// MongoDB connection URL
// const MONGO_URL = "mongodb://127.0.0.1:27017/TravelMitra";


// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

async function main() {
  await mongoose.connect(dbUrl); // Use the variable directly
}

// Define a root route
// app.get("/", (req, res) => {
//   res.send("Hi, I am Root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use('/demouser',async(req,res)=>{
//   let fakeUser=new User({
//     email:"student@gmail.com",
//     username:"rahul"
//   });
//   let registeredUser=await User.register(fakeUser,"hello123");
//   res.send(registeredUser);
// })

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingsRoute);

//Reviews
app.use("/listings/:id/reviews", reviewRoute);
//user
app.use("/", userRoute);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

///error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, (req, res) => {
  console.log("Server is Listening to Port 8080 ");
});
