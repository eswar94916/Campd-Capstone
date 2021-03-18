const mongoose = require("mongoose");
const json2csv = require('json2csv').parse;
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
                res.setHeader('Content-disposition', 'attachment; filename=research_projects.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csv);  
            }
        })
    })

    return router;
};