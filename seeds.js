
var mongoose = require("mongoose");
var Campgrounds = require("./models/campgrounds");
var Comment = require("./models/comment");

// var data = [
//     {
//         name: "Salmon Sumo", 
//         image: "https://images.unsplash.com/photo-1512148391990-17241c3d33d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=705881db8194a0697b4224b0a0646c96&auto=format&fit=crop&w=1189&q=80", 
//         description: "Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished out law. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an. Ought these are balls place mrs their times add she. Taken no great widow spoke of it small. Genius use except son esteem merely her limits. Sons park by do make on. It do oh cottage offered cottage in written. Especially of dissimilar up attachment themselves by interested boisterous. Linen mrs seems men table. Jennings dashwood to quitting marriage bachelor in. On as conviction in of appearance apartments boisterous. Cultivated who resolution connection motionless did occasional. Journey promise if it colonel. Can all mirth abode nor hills added. Them men does for body pure. Far end not horses remain sister. Mr parish is to he answer roused piqued afford sussex. It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears are day blind smile alone had."
//     },
//     {
//         name: "Gregory Abshtein", 
//         image: "https://images.unsplash.com/photo-1512147778441-da854a1632d9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=acb156a05f576ba67a64902f01df310f&auto=format&fit=crop&w=1050&q=80", 
//         description: "Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished out law. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an. Ought these are balls place mrs their times add she. Taken no great widow spoke of it small. Genius use except son esteem merely her limits. Sons park by do make on. It do oh cottage offered cottage in written. Especially of dissimilar up attachment themselves by interested boisterous. Linen mrs seems men table. Jennings dashwood to quitting marriage bachelor in. On as conviction in of appearance apartments boisterous. Cultivated who resolution connection motionless did occasional. Journey promise if it colonel. Can all mirth abode nor hills added. Them men does for body pure. Far end not horses remain sister. Mr parish is to he answer roused piqued afford sussex. It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears are day blind smile alone had."
//     },
//     {
//         name: "Fury Alizabeth", 
//         image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=1095&q=80", 
//         description: "Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished out law. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an. Ought these are balls place mrs their times add she. Taken no great widow spoke of it small. Genius use except son esteem merely her limits. Sons park by do make on. It do oh cottage offered cottage in written. Especially of dissimilar up attachment themselves by interested boisterous. Linen mrs seems men table. Jennings dashwood to quitting marriage bachelor in. On as conviction in of appearance apartments boisterous. Cultivated who resolution connection motionless did occasional. Journey promise if it colonel. Can all mirth abode nor hills added. Them men does for body pure. Far end not horses remain sister. Mr parish is to he answer roused piqued afford sussex. It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears are day blind smile alone had."
//     }
// ];

function seedDB(){
    // Remove all campgrounds
    Campgrounds.remove({}, function(err){
        if (err) return console.log(err);
        console.log("All campgrounds removed");
    // Add a few campgrounds
        data.forEach(function(seed){
            Campgrounds.create(seed, function(err, campground){
                if (err) return console.log(err);
                console.log("Added a new campground");
                // Create a comment
                Comment.create(
                    {
                        text: "There is some comments about...",
                        author: "That's Me"
                    }, function(err, comment){
                        if (err) return console.log(err);
                        campground.comments.push(comment);
                        console.log("Added a new comment");
                        campground.save();
                    }
                )
            });
        });
    });
}

module.exports = seedDB;


