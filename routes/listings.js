const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingControllers.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingControllers.createListing)
  );
  // .post(upload.single('listing[image]'),(req,res)=>res.send(req.file));

//new Route
router.get("/new", isLoggedIn, wrapAsync(listingControllers.renderNewForm));

router
  .route("/:id")
  .get(wrapAsync(listingControllers.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingControllers.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));

//Edit Id
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.editListing)
);

module.exports = router;
