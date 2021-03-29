const mongoose = require("mongoose");
const passport = require("passport");
const csvtojson = require("csvtojson");
const router = require("express").Router();
const projectModel = mongoose.model("Project");

module.exports = function (gfs) {
    // Defined store route
    router.post("/add", function (req, res) {
        csvtojson()
        .fromFile(req.body)
        .then(csvData => {
            console.log(csvData);
    });



return router;
});
};