const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const projectModel = mongoose.model("Project");
const userModel = mongoose.model("User");

const auth = require("../auth");

module.exports = function (gfs) {
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

    router.post("/edit", auth, async function (req, res) {
        if (!req.body.hasOwnProperty("projectID")) {
            res.status("400").json({
                errors: "Must include project database ID to edit",
            });
        }

        if (req.body.hasOwnProperty("changes")) {
            let projectID = req.body.projectID;
            let projectChanges = req.body.changes;

            let thisProject, thisUser;

            /**
             * Find the project we are looking for
             */
            try {
                console.log("finding project");
                thisProject = await projectModel.findOne({ _id: projectID });
                if (!thisProject) {
                    res.status(400).send("Project not found");
                }
            } catch (err) {
                console.log(err);
                res.status(400).send("Project not found");
            }
            /**
             * Find the user who is requesting to edit this project
             */
            try {
                thisUser = await userModel.findOne({ _id: req.user.id });
                if (!thisUser) {
                    res.status(400).send("User not found");
                }
            } catch (err) {
                console.log(err);
                res.status(400).send("User not found");
            }

            console.log("project", thisProject);
            console.log("user", thisUser);

            res.status(200).send("okay");
        } else {
            res.status(200).send("No changes were made");
        }
    });

    // Defined get data(index or listing) route
    router.get("/", function (req, res) {
        console.log("getting projects");
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
