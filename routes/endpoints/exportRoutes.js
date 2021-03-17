const mongoose = require("mongoose");
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const path = require('path')
const fields = ['tags', 'date', '_id','name', 'owner', 'ownerID', 'contactInfo','status', 'description', 'gitRepo', 'image', '__v'];
const router = require("express").Router();
const projectModel = mongoose.model("Project");

module.exports = function() {

    router.get('/', function (req, res) {
        projectModel.find({}).exec(function (err, projects) {
            if (err) {
                return res.status(500).json({ err });
            }
            else {  
                let csv
                try {
                    csv = json2csv(projects, { fields });
                } catch (err) {
                    return res.status(500).json({ err });
                }
                const dateTime = moment().format('YYYYMMDDhhmmss');
                console.log("date-Time:" + dateTime);
                const filePath = path.join(__dirname, "..", "csv-" + dateTime + ".csv")
                fs.writeFile(filePath, csv, function (err) {
                    if (err) {
                    return res.json(err).status(500);
                    }
                    else {
                    setTimeout(function () {
                        fs.unlinkSync(filePath); // delete this file after 30 seconds
                    }, 30000)
                    return res.json("/exports/csv-" + dateTime + ".csv");
                    }
                }); 
    
            }
        })
    })

    return router;
};