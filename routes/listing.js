const express = require("express");
const router = express.Router();

const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");


const {isLoggedIn , isOwner ,validateListing} = require("../middleware.js");

const ListingController = require("../controllers/listings.js");




// Index.route

router.get("/",wrapAsync(ListingController.index));

// page.route

router.get("/road",wrapAsync(ListingController.road));
router.get("/education",wrapAsync(ListingController.education));
router.get("/electricity",wrapAsync(ListingController.electricity));
router.get("/health",wrapAsync(ListingController.health));
router.get("/sanitation",wrapAsync(ListingController.sanitation));
router.get("/water",wrapAsync(ListingController.water));

//category
router.get("/category/:c",ListingController.category);

//new Route   
router.get("/new",isLoggedIn,ListingController.renderNewForm);

// //new Route   
// router.get("/admin",isLoggedIn,ListingController.renderAdmin);

// Admin Dashboard
router.get("/admin", wrapAsync(ListingController.renderAdminDashboard));

// Update Listing Status
router.put("/:id/status",wrapAsync(ListingController.updateStatus));

// Show Route 
router.get("/:id" ,wrapAsync(ListingController.showListing));

// Creat route
router.post("/" ,validateListing,isLoggedIn,wrapAsync(ListingController.createListing));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditFrom));

//update route
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,wrapAsync(ListingController.updateListing));

   
    //update status
router.put("/:id/status",
    isLoggedIn,
   validateListing,wrapAsync(ListingController.statusListing));


//Delete route
router.delete("/:id",isLoggedIn,
    isOwner, wrapAsync(ListingController.destroyListing));

module.exports = router;