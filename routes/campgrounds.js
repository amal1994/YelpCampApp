var express = require("express");
var router = express.Router();
var Campground      = require("../models/campground");
var middleware      = require("../middleware");

//INDEX - show all campgroundsss
router.get("/",function(req,res){
    
    //res.render("campgrounds",{campgrounds:campgrounds});
    Campground.find({}, function(err,allCampgrounds){
       if(err){
           console.log(err);
       } 
       else{
           res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to database
router.post("/",middleware.isLoggedIn,function(req,res){
  
  //get data from form add
  var name  = req.body.name;
  var image =  req.body.image;
  var price = req.body.price;
  var desc  =  req.body.description;
  var author ={
      id:req.user._id,
      username:req.user.username
  }
  
  var newCampGround = {name:name,image:image,price:price,description:desc,author:author};
  
  //create new campground and save to database
  
  Campground.create(newCampGround,function(err, newCampground){
      if(err){
         console.log(err);
      }
      else{
        //redirect back to campgrounds page
        res.redirect("/campgrounds");
      }
  })
  
  
    
});


//NEW - route to show form
router.get("/new",middleware.isLoggedIn,function(req,res){
  
  res.render("campgrounds/new");
    
});

router.get("/:id",function(req,res){
    
    //get campground by id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } 
       else{
           res.render("campgrounds/show", {campground:foundCampground});
       }
    });
    
});

//Edit and Update Route

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){

        Campground.findById(req.params.id,function(err,foundCampground){
            
            res.render("campgrounds/edit",{campground:foundCampground});
        
        })
    
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       }
       else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   
   })
    
});

//Destroy Route

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
})




module.exports = router;