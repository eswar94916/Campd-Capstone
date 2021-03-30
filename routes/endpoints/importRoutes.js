const mongoose = require("mongoose");
const passport = require("passport");
const csvtojson = require("csvtojson");
//const fastcsv = require("fast-csv");
const router = require("express").Router();
const projectModel = mongoose.model("Project");
const fs = require("fs");
var async = require('async');


csvtojson()
        .fromFile("angel.csv")
        .then(csvData => {
            async.eachSeries(csvData,(data,callback) => {
                  let entity = {
                    name: data.name,
                    owner: data.owner,
                    ownerID: data.ownerID,
                    contactInfo: data.contactInfo,
                    status: data.status,
                    description: data.description,
                    tags: data.tags,
                    gitRepo: data.gitRepo,
                    image: data.image,
                    userGuide: data.userGuide,
                    developerGuide: data.developerGuide,
                    installationGuide: data.installationGuide
                    };
                    projectModel.create({entity}, function(err)
                    {
                        if(err) return callback(err);
                        return callback(null);    
                    })
               },
                (err) => {
                     if(err) console.log(err); 
                     console.log("projects are successfully imported!!!");
                     return promise;
                });

});