
var express = require("express");
var router = express.Router({mergeParams: true});
var Campgrounds = require("../models/campgrounds");
var Commentt = require("../models/comment");
var middleware = require("../middleware"); // automatically require index.js

// NEW
router.get("/new", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
    Campgrounds.findById(req.params.id, function(err, campground){
        if (err || !campground)
        {
            req.flash("error", "Campground not found.");
            console.log(err);
            return res.redirect("back");
        }
        res.render("comments/new", {campground: campground});
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
    Campgrounds.findById(req.params.id, function(err, campground){
        if (err || !campground)
        {
            req.flash("error", "Campground not found.");
            console.log(err);
            return res.redirect("back");
        }
        Commentt.create(req.body.comment, function(err, comment){
            if (err) 
            {
                req.flash("error", "Something went wrong. Please try again.");
                console.log(err);
                return res.redirect("back");
            }
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();

            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
        });
    })
});

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, middleware.isAdmin, function(req, res){
    Campgrounds.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error", "Campground not found.");
            console.log(err);
            return res.redirect("back");
        }
        Commentt.findById(req.params.comment_id, function(err, foundComment){
            if (err || !foundComment)
            {
                req.flash("error", "Comment not found.");
                console.log(err);
                return res.redirect("back");
            }
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        });
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, middleware.isAdmin, function(req, res){
    Commentt.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) return res.redirect("back");
        else res.redirect("/campgrounds/" + req.params.id);
    });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, middleware.isAdmin, function(req, res){
    Campgrounds.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error", "Campground not found.");
            console.log(err);
            return res.redirect("back");
        }
        Commentt.findByIdAndRemove(req.params.comment_id, function(err){
            if (err)
            {
                console.log(err);
                return res.redirect("back");
            }
            res.redirect("/campgrounds/" + req.params.id);
        });
    });
});

module.exports = router;
