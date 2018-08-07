//MiddleWares

var Campgrounds = require("../models/campgrounds");
var Commentt = require("../models/comment");

var middleWareOdj = {};

middleWareOdj.checkCampgroundOwnership = function(req, res, next){
    if (req.isAuthenticated())  // If the user loged in
    {
        if (req.user.isAdmin)   // If user is an admin
            return next();
        Campgrounds.findById(req.params.id, function(err, foundCampground){
            if (err || !foundCampground)
            {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            }
            else if (foundCampground.author.id.equals(req.user._id)) // if user is author of the campground
                next();
            else 
            {
                req.flash("error", "You have no permission to do that.");
                res.redirect("back");
            }
        });
    }
    else    // The the user is not loged in
    {
        req.flash("error", "You need to be loged in.");
        res.redirect("back");
    }
}

middleWareOdj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated())  // If the user loged in
    {
        if (req.user.isAdmin)
            return next();
        Commentt.findById(req.params.comment_id, function(err, foundComment){
            if (err || !foundComment)
            {
                req.flash("error", "Comment not found."); 
                res.redirect("back");
            }
            else if (foundComment.author.id.equals(req.user._id)) // if user is author of the comment
                next();
            else
            {
                req.flash("error", "You have no permission to do that.");
                res.redirect("back");
            }
        });
    }
    else    // The the user is not loged in
    {
        req.flash("error", "You need to be loged in.");
        res.redirect("back");
    }
}

middleWareOdj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) // If the user loged in
        return next();
    // The the user is not loged in
    req.flash("error", "You need to be loged in.");
    res.redirect("/login");
}

middleWareOdj.isAdmin = function(req, res, next){
    if (!req.user.isAdmin)
    {
        req.flash("error", "For now only the administrator can do this.");
        return res.redirect("back");
    }
    else
        return next();
}

module.exports = middleWareOdj;
