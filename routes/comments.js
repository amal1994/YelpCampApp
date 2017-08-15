var express = require("express");
//mergeParams let you access params
var router = express.Router({mergeParams:true});
var Comment         = require("../models/comment");
var Campground      = require("../models/campground");
var middleware      = require("../middleware");

//==============
//COMMENT ROUTES
//==============

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("comments/new",{campground: campground});
        }
    });
    
});

router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using id
   Campground.findById(req.params.id,function(err,campground){
       if(err)
       {
           console.log(err);
           res.redirect("/campgrounds");
       }
       else{
           Comment.create(req.body.comment,function(err,comment){
              if(err)
              {
                req.flash("error","Something went wrong");
              }
              else{
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  campground.comments.push(comment);
                  comment.save();
                  campground.save();
                  req.flash("success","Successfully added comment");
                  res.redirect('/campgrounds/'+ campground._id);
              }
              
           });
       }
   });
   //create mew comment
   //connect new comment to campground
   //redirect to campground show page
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    })
    
})

//update comment

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
         if(err){
             res.redirect("back");
         }
         else{
             res.redirect("/campgrounds/"+req.params.id);
         }
    })
    
})

//destroy comment

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



module.exports = router;