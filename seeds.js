var mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment");
    
    
var data=[
        {
            name:"sunrise beach",
            image:"https://images.bringfido.com/site_media/photos/lodging/3/9/6/160693/beach4.jpg",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris ex, gravida et dignissim a, iaculis sollicitudin odio. Nullam cursus iaculis nulla. Maecenas placerat nibh ipsum. Sed gravida velit vitae libero dictum eleifend. Integer laoreet tempor lectus, vitae sagittis enim cursus lobortis. Mauris pharetra ante libero, nec placerat sem convallis rhoncus. Integer in facilisis ante. Integer ultrices diam eget sem lobortis, sit amet hendrerit dui efficitur. Proin pretium, libero at auctor placerat, magna nisi vestibulum turpis, at placerat neque purus eget neque. Suspendisse massa purus, pulvinar a vehicula vel, eleifend vel nisl. Pellentesque habitant morbi tristique senectus et netus et."
        },
        
        {
            name:"mountain and campers",
            image:"https://www.reserveamerica.com/marketing/html/acm/__shared/assets/NYC_Camping1723.jpg",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris ex, gravida et dignissim a, iaculis sollicitudin odio. Nullam cursus iaculis nulla. Maecenas placerat nibh ipsum. Sed gravida velit vitae libero dictum eleifend. Integer laoreet tempor lectus, vitae sagittis enim cursus lobortis. Mauris pharetra ante libero, nec placerat sem convallis rhoncus. Integer in facilisis ante. Integer ultrices diam eget sem lobortis, sit amet hendrerit dui efficitur. Proin pretium, libero at auctor placerat, magna nisi vestibulum turpis, at placerat neque purus eget neque. Suspendisse massa purus, pulvinar a vehicula vel, eleifend vel nisl. Pellentesque habitant morbi tristique senectus et netus et."
        },
        
        {
            name:"Whistling Woods",
            image:"http://visitadirondacks.com/sites/default/files/styles/max-400/public/ledgeview_visit_sites_image.jpg?itok=EqYMTegn",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris ex, gravida et dignissim a, iaculis sollicitudin odio. Nullam cursus iaculis nulla. Maecenas placerat nibh ipsum. Sed gravida velit vitae libero dictum eleifend. Integer laoreet tempor lectus, vitae sagittis enim cursus lobortis. Mauris pharetra ante libero, nec placerat sem convallis rhoncus. Integer in facilisis ante. Integer ultrices diam eget sem lobortis, sit amet hendrerit dui efficitur. Proin pretium, libero at auctor placerat, magna nisi vestibulum turpis, at placerat neque purus eget neque. Suspendisse massa purus, pulvinar a vehicula vel, eleifend vel nisl. Pellentesque habitant morbi tristique senectus et netus et."
        }
    ]

function seedDB(){

    Campground.remove({},function(err){
        
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("campground removed"); 
            //add a few campgrounds
            data.forEach(function(seed){
               Campground.create(seed,function(err, campground){
                   if(err)
                   {
                       console.log(err);
                   }
                   else{
                       console.log("added a campground");
                       //create a comment
                       Comment.create(
                           
                           {
                               text:"This place is great, but i wish there was internet",
                               author:"homer"
                           },function(err,comment)
                           {
                              if(err)
                              {
                                 console.log(err);
                              }
                              else{
                                  campground.comments.push(comment);
                                  campground.save();
                              }
                              
                           });
                   }
               }) 
            });
        }
    
    });
    
}

module.exports = seedDB;
    
