const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const projectModel = mongoose.model("Project");
const userModel = mongoose.model("User");

const auth = require("../auth");

module.exports = function (gfs) {
    /* -------------------------------------------------------------------------- */
    /*                            Create a new project                            */
    /* -------------------------------------------------------------------------- */

    router.post("/add", auth.required, async function (req, res) {
        /**
         * Get the user requesting this project
         */
        var thisUser;
        try {
            thisUser = await userModel.findOne({ _id: req.user.id });
            if (!thisUser) {
                res.status(400).send("User not found");
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("User not found");
        }

        var newProject = req.body;

        /**
         * Set project approved if the creator is an admin
         */
        newProject.statuses = {};
        if (thisUser.isAdmin) {
            newProject.statuses.isApproved = true;
        } else {
            newProject.statuses.isApproved = false;
        }

        let project = new projectModel(newProject);

        /**
         * Save the project in the database
         */
        project
            .save()
            .then((project) => {
                res.status(200).json(project);
            })
            .catch((err) => {
                res.status(400).send("unable to save to database");
            });
    });

    /* -------------------------------------------------------------------------- */
    /*                           Edit an existing poject                          */
    /* -------------------------------------------------------------------------- */

    router.post("/edit", auth.required, async function (req, res) {
        if (!req.body.hasOwnProperty("projectID")) {
            res.status(400).json({
                errors: "Must include project database ID to edit",
            });
        } else if (!req.body.hasOwnProperty("changes")) {
            res.status(200).send("No changes were made");
        } else {
            let projectID = req.body.projectID;
            let projectChanges = req.body.changes;

            let thisProject, thisUser;

            /**
             * Find the project we are looking for
             */
            try {
                thisUser = await userModel.findOne({ _id: req.user.id });
                if (!thisUser) {
                    throw "user";
                }
                thisProject = await projectModel.findOne({ _id: projectID });
                if (!thisProject) {
                    throw "project";
                }
                thisProject.set(projectChanges);
                await thisProject.save();
            } catch (err) {
                console.log(err);
                switch (err) {
                    case "user":
                        res.status(400).send("No such user");
                        break;
                    case "project":
                        res.status(400).send("Could not find project");
                        break;
                    default:
                        res.status(500).send(err);
                }
            }

            res.status(200).send("okay");
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                           Adds tags to a project                           */
    /* -------------------------------------------------------------------------- */

    router.post("/addtags", auth.required, async function (req, res) {
        if (!req.body.hasOwnProperty("projectID")) {
            res.status(400).json({
                errors: "Must include project database ID to edit",
            });
        } else if (!req.body.hasOwnProperty("tags")) {
            res.status(200).send("No tags were added");
        } else {
            let projectID = req.body.projectID;
            let newTags = req.body.tags;

            let thisProject, thisUser;

            /**
             * Find the project(s) we are looking for
             */
            try {
                thisUser = await userModel.findOne({ _id: req.user.id });
                if (!thisUser) {
                    throw "user";
                }
                if (Array.isArray(projectID)) {
                    for await (const thisID of projectID) {
                        thisProject = await projectModel.findOne({ _id: thisID });
                        if (!thisProject) {
                            throw "project";
                        }

                        thisProject.tags = thisProject.tags.concat(newTags);
                        await thisProject.save();
                    }
                } else {
                    thisProject = await projectModel.findOne({ _id: projectID });
                    if (!thisProject) {
                        throw "project";
                    }

                    thisProject.tags = thisProject.tags.concat(newTags);
                    await thisProject.save();
                }
            } catch (err) {
                console.log(err);
                switch (err) {
                    case "user":
                        res.status(400).send("No such user");
                        break;
                    case "project":
                        res.status(400).send("Could not find project");
                        break;
                    default:
                        res.status(500).send(err);
                }
            }

            res.status(200).send("okay");
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                      Remove tags from projectModel(s)                      */
    /* -------------------------------------------------------------------------- */
    router.post("/removetags", auth.required, async function (req, res) {
        if (!req.body.hasOwnProperty("projectID")) {
            res.status(400).json({
                errors: "Must include project database ID to edit",
            });
        } else if (!req.body.hasOwnProperty("tags")) {
            res.status(200).send("No tags were added");
        } else {
            let projectID = req.body.projectID;
            let removeTags = req.body.tags;

            let thisProject, thisUser;

            /**
             * Find the project(s) we are looking for
             */
            try {
                thisUser = await userModel.findOne({ _id: req.user.id });
                if (!thisUser) {
                    throw "user";
                }
                if (Array.isArray(projectID)) {
                    for await (const thisID of projectID) {
                        thisProject = await projectModel.findOne({ _id: thisID });
                        if (!thisProject) {
                            throw "project";
                        }

                        thisProject.tags = thisProject.tags.filter(function (el) {
                            return !removeTags.includes(el);
                        });
                        await thisProject.save();
                    }
                } else {
                    thisProject = await projectModel.findOne({ _id: projectID });
                    if (!thisProject) {
                        throw "project";
                    }

                    thisProject.tags = thisProject.tags.filter(function (el) {
                        return !removeTags.includes(el);
                    });
                    await thisProject.save();
                }
            } catch (err) {
                console.log(err);
                switch (err) {
                    case "user":
                        res.status(400).send("No such user");
                        break;
                    case "project":
                        res.status(400).send("Could not find project");
                        break;
                    default:
                        res.status(500).send(err);
                }
            }

            res.status(200).send("okay");
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                           Adds status to a project                         */
    /* -------------------------------------------------------------------------- */

    router.post("/updateStatus", auth.required, async function (req, res) {
        if (!req.body.hasOwnProperty("projectID")) {
            res.status(400).json({
                errors: "Must include project database ID to edit",
            });
        } else if (!req.body.hasOwnProperty("status")) {
            res.status(200).send("status is undefined");
        } else {
            let projectID = req.body.projectID;
            let newStatus = req.body.status;

            let thisProject, thisUser;

            /**
             * Find the project(s) we are looking for
             */
            try {
                thisUser = await userModel.findOne({ _id: req.user.id });
                if (!thisUser) {
                    throw "user";
                }
                if (Array.isArray(projectID)) {
                    for await (const thisID of projectID) {
                        thisProject = await projectModel.findOne({ _id: thisID });
                        if (!thisProject) {
                            throw "project";
                        }

                        thisProject.statuses = Object.assign(thisProject.statuses, newStatus);
                        await thisProject.save();
                    }
                } else {
                    thisProject = await projectModel.findOne({ _id: projectID });
                    if (!thisProject) {
                        throw "project";
                    }

                    thisProject.statuses = Object.assign(thisProject.statuses, newStatus);
                    await thisProject.save();
                }
            } catch (err) {
                console.log(err);
                switch (err) {
                    case "user":
                        res.status(400).send("No such user");
                        break;
                    case "project":
                        res.status(400).send("Could not find project");
                        break;
                    default:
                        res.status(500).send(err);
                }
            }
            res.status(200).send("okay");
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                          Get all existing projects                         */
    /* -------------------------------------------------------------------------- */

    router.get("/", function (req, res) {
        console.log("getting projects");
        console.log(req.user);
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

    /* -------------------------------------------------------------------------- */
    /*                  Get all projects owned by specified EUID                  */
    /* -------------------------------------------------------------------------- */
    /* ---------------- Route looks like /projects/owner/abc1234 ---------------- */
    /* -------------------------------------------------------------------------- */

    router.get("/owner/:euid", async function (req, res) {
        var thisUser, usersProjects;
        try {
            thisUser = await userModel.findOne({ euid: req.params.euid });
            if (!thisUser) {
                throw "user";
            }

            usersProjects = await projectModel.find({ ownerID: thisUser._id });

            console.log(usersProjects);
            res.json(usersProjects);
        } catch (err) {
            console.log(err);
            if (err == "user") {
                res.status(400).send("No such user");
            } else if (err == "projects") {
                res.status(400).send("User has no projects");
            } else {
                res.status(500).send(err);
            }
        }
    });

    // Defined get data(index or listing) route to search for a project
    router.get("/projects/:name", function (req, res, q) {
        console.log("projects name query is", req.query.name);
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
