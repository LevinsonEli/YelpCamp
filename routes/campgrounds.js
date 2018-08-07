

var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campgrounds");
var middleware = require("../middleware"); // automatically require index.js

// INDEX
router.get("/", function(req, res){
    //eval(require("locus"));
    if (req.query.search)
    {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campgrounds.find({name: regex}, function(err, allCampgrounds){
            if(err) return console.log( err );
            res.render("campgrounds/index", {campgrounds: allCampgrounds/*, currentUser: req.user*/});
        });
    }
    else
    {
        Campgrounds.find({}, function(err, allCampgrounds){
            if(err) return console.log( err );
            res.render("campgrounds/index", {campgrounds: allCampgrounds/*, currentUser: req.user*/});
        });
    }
});

// CREATE
router.post("/", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, description: description, price: price, author: author};
    Campgrounds.create(newCamp, function(err, newlyCreated){
        if(err)
        {
            req.flash("error", err.message);
            return console.log(err);
        }
        res.redirect("/campgrounds");
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
   res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function(req, res){
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error", "Campground not found.");
            console.log(err);
            return res.redirect("/campgrounds");
        }
        //console.log(currentUser);
        res.render("campgrounds/show", {campground: foundCampground/*, currentUser: req.user*/});
    });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, middleware.isAdmin, function(req, res){
    Campgrounds.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, middleware.isAdmin, function(req, res){
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if (err || !foundCampground)
        {
            req.flash("error", "Campground not found.");
            console.log(err);
            return res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, middleware.isAdmin, function(req, res){
    Campgrounds.findByIdAndRemove(req.params.id, function(err){
        if (err)
        {
            req.flash("error", "Campground not found.");
            console.log(err);
            return res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
