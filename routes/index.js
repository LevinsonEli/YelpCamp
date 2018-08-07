
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// AUTH ROUTES

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome, " + req.body.username);
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Loged Out");
    res.redirect("/campgrounds");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: 'Invalid username or password.',
        successFlash: 'Successfuly logen in.'
    }), function(req, res){
});

module.exports = router;
