const mongoose = require("mongoose");
const passport = require("passport");
const csvtojson = require("csvtojson");
const router = require("express").Router();
const projectModel = mongoose.model("Project");

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