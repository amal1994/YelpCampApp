var express         = require("express");
var router          = express.Router();
var passport        = require("passport");
var Comment         = require("../models/comment");
var Campground      = require("../models/campground");
var User            = require("../models/user");

//Routing

router.get("/",function(req,res){
   res.render("landing"); 
});

//Auth Routes

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
       if(err){
           console.log(err);
           req.flash("error", err.message);
           return res.redirect('register');
       } 
       passport.authenticate("local")(req,res,function(){
          req.flash("success","Welcome to Yelpcamp "+ user.username);
          res.redirect("/campgrounds"); 
       });
    });
});

//Login Routes

router.get("/login",function(req,res){
    res.render("login");
});

//Login Logic

router.post("/login",passport.authenticate("local",{
    
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    
}),function(req,res){
    
});

//Logout Route

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "Logged u out");
    res.redirect("/");
});

module.exports = router;