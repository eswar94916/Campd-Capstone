const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const projectModel = mongoose.model("Project");

module.exports = function () {
    // Defined store route
    router.post("/add", function (req, res) {
        let project = new projectModel(req.body);
        project
            .save()
            .then((project) => {
                res.status(200).json(project);
            })
            .catch((err) => {
                res.status(400).send("unable to save to database");
            });
    });

    // Defined get data(index or listing) route
    router.get("/", function (req, res) {
        projectModel
            .find({})
            .sort("-date")
            .exec(function (err, projects) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(projects);
                }
            });
    });

    // Defined get data(index or listing) route to search for a project
    router.get("/projects/:name", function (req, res, q) {
        projectModel.search(q, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(projects);
                console.log(data);
            }
        });
    });

    // Defined delete | remove | destroy route
    router.get("/delete/:id", function (req, res) {
        projectModel.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
            if (err) res.json(err);
            else res.json(req.params.id);
        });
    });

    return router;
};
