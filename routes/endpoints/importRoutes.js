const mongoose = require("mongoose");
const passport = require("passport");
var json2csv = require('json2csv');
//const csvtojson = require("csvtojson");
const router = require("express").Router();
const projectModel = mongoose.model("Project");
var csv = require("fast-csv");
var fs = require('fs');
var stream = fs.createReadStream(csvfile);

exports.get = function(req, res) {
 
    var fields = [
        'name', 'owner', 'ownerID', 'contactInfo', 'status', 'description', 'tags', 'gitRepo', 'image', 'userGuide', 'developerGuide', 'installationGuide'
    ];
 
    var csv = json2csv({ data: '', fields: fields });
 
    res.set("Content-Disposition", "attachment;filename=authors.csv");
    res.set("Content-Type", "application/octet-stream");
 
    res.send(csv);
 
};



var temptest;

csvtojson()
.fromFile("angel.csv")
.then(csvData => {

  //console.log(csvData);

   temptest = csvData;
  console.log(temptest);

});

let project = new projectModel(temptest)
project
    .save()
    .then((project) => {
        res.status(200).json(project);
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    }); 