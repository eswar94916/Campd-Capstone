const mongoose = require("mongoose");
const passport = require("passport");
const csvtojson = require("csvtojson");
const router = require("express").Router();
const projectModel = mongoose.model("Project");

//const auth = require("../auth");

exports.get = function(req, res) {
 
    var fields = [
        'name', 'owner', 'ownerID', 'contactInfo', 'status', 'description', 'tags', 'gitRepo', 'image', 'userGuide', 'developerGuide', 'installationGuide'
    ];
 
    //var csv = csvtojson({ data: '', fields: fields });


        csvtojson()
        .fromFile(req.body)
        .then(csvData => {
            console.log(csvData);
        
 
    // res.set("Content-Disposition", "attachment;filename=authors.csv");
    // res.set("Content-Type", "application/octet-stream");
 
    //res.send(csv);
 
});



// var temptest;

// csvtojson()
// .fromFile("angel.csv")
// .then(csvData => {

//   //console.log(csvData);

//    temptest = csvData;
//   console.log(temptest);

// });

// let project = new projectModel(temptest)
// project
//     .save()
//     .then((project) => {
//         res.status(200).json(project);
//     })
//     .catch((err) => {
//         res.status(400).send("unable to save to database");
     }; 