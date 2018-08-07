
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    seedDB         = require("./seeds"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    User           = require("./models/user"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash");
//var Campgrounds = require("./models/campgrounds");
//var Commentt = require("./models/comment");
app.locals.moment = require("moment");

// requiring routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");

// seedDB();
urldb = /*"mongodb://localhost:27017/yelp_camp" || */"mongodb://levinson:hello#1#world@ds113452.mlab.com:13452/yelpcampdb";
mongoose.connect(urldb, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Secret sentence",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.get("/", function(req, res){
    res.render("landing");
    //console.log(req.user);
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp camp server has started");
});
