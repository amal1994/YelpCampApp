var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"), 
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    

//Routes

var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");

    
//connecting database

mongoose.connect("mongodb://localhost/yelp_camp_version8");

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));


//__dirname is to get the current directory

app.use(express.static(__dirname+"/public"));

app.use(methodOverride("_method"));

app.use(flash());

//Seeding DATABASE
//seedDB();


//Passport Configuration

app.use(require('express-session')({
    secret:'required to sign the session ID cookie',
    resave :false,
    saveUninitialized:false
}));


app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

//middleware to provide currentUser

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});


//Using Routes
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Serving YelpCamp"); 
});