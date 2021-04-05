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
                throw "no user";
            }
            var newProject = req.body;
            console.log(req.body);

            /**
             * Set project approved if the creator is an admin
             */
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
        } catch (err) {
            console.log(err);
            res.status(400).send("User not found");
        }
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
                /**
                 * Check if this user is the owner of this project. If they are,
                 * the edits can be made. If they are not the owner, the user
                 * must be an admin to make changes to the project
                 */

                if (thisProject.ownerID === thisUser._id || thisUser.isAdmin) {
                    thisProject.set(projectChanges);
                    await thisProject.save();
                } else {
                    throw "unauthorized";
                }
                res.status(200).send("okay");
            } catch (err) {
                console.log(err);
                switch (err) {
                    case "user":
                        res.status(400).send("No such user");
                        break;
                    case "project":
                        res.status(400).send("Could not find project");
                        break;
                    case "unauthorized":
                        res.status(402).send("Must be admin to edit someone else's project");
                        break;
                    default:
                        res.status(500).send(err);
                }
            }
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                         Batch edit tags and status                         */
    /* -------------------------------------------------------------------------- */

    router.post("/batchEdit", auth.admin, async function (req, res) {
        if (!req.body.hasOwnProperty("projectID")) {
            res.status(400).json({
                errors: "Must include project database ID to edit",
            });
        } else if (
            !req.body.hasOwnProperty("newTags") &&
            !req.body.hasOwnProperty("removeTags") &&
            !req.body.hasOwnProperty("newStatus")
        ) {
            res.status(200).send("No changes were added");
        } else {
            let projectID = req.body.projectID;
            let newTags = req.body.newTags ? req.body.newTags : [];
            let removeTags = req.body.removeTags ? req.body.removeTags : [];
            let newStatus = req.body.newStatus;

            let thisProject;
            /**
             * Find the project(s) we are looking for
             */
            try {
                if (Array.isArray(projectID)) {
                    for await (const thisID of projectID) {
                        thisProject = await projectModel.findOne({ _id: thisID });
                        if (!thisProject) {
                            throw "project";
                        }
                        thisProject.tags = thisProject.tags.concat(newTags);
                        thisProject.tags = [...new Set(thisProject.tags)]; //adding tags
                        thisProject.tags = thisProject.tags.filter(function (el) {
                            return !removeTags.includes(el); //removing tags
                        });

                        thisProject.statuses = Object.assign(thisProject.statuses, newStatus); //updating status

                        await thisProject.save();
                    }
                } else {
                    thisProject = await projectModel.findOne({ _id: projectID });
                    if (!thisProject) {
                        throw "project";
                    }

                    thisProject.tags = thisProject.tags.concat(newTags);
                    thisProject.tags = [...new Set(thisProject.tags)];
                    thisProject.tags = thisProject.tags.filter(function (el) {
                        return !removeTags.includes(el);
                    });

                    thisProject.statuses = Object.assign(thisProject.statuses, newStatus);

                    await thisProject.save();
                }
                res.status(200).send("okay");
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
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                        approve or reject project(s)                        */
    /* -------------------------------------------------------------------------- */

    router.post("/review", auth.admin, async function (req, res) {
        if (!req.body.hasOwnProperty("projectID") && !req.body.hasOwnProperty("action")) {
            res.status(400).send("Must include project id(s) and action to perform!");
        } else {
            try {
                if (Array.isArray(projectID)) {
                    for await (const thisID of projectID) {
                        var thisProject = await projectModel.findOne({ _id: thisID });
                        if (!thisProject) {
                            throw "project";
                        }
                        if (action == "approve") {
                            thisProject.statuses.isApproved = true;
                        } else if (action == "reject") {
                            thisProject.statuses.isApproved = false;
                        }
                        await thisProject.save();
                    }
                } else {
                    var thisProject = await projectModel.findOne({ _id: projectID });
                    if (!thisProject) {
                        throw "project";
                    }
                    if (action == "approve") {
                        thisProject.statuses.isApproved = true;
                    } else if (action == "reject") {
                        thisProject.statuses.isApproved = false;
                    }
                    await thisProject.save();
                }
                res.status(200).send("okay");
            } catch (error) {
                if (error == "project") {
                    res.status(500).send("project not found!");
                }
            }
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
    /*                           Get projects by status                           */
    /* -------------------------------------------------------------------------- */
    router.get("/bystatus", async function (req, res) {
        if (!req.body.hasOwnProperty("status")) {
            res.status(400).json({
                errors: "Must specify status",
            });
        } else {
            var statusMatch = req.body.status;

            var allProjects = await projectModel.find({}).sort("-date");
            var matchedProjects = [];
            try {
                for await (const thisProject of allProjects) {
                    var shouldInclude = true;
                    for (const [key, value] of Object.entries(statusMatch)) {
                        if (thisProject.statuses[key] != statusMatch[key]) {
                            shouldInclude = false;
                        }
                    }
                    if (shouldInclude) {
                        matchedProjects.push(thisProject);
                    }
                }
                res.status(200).json(matchedProjects);
            } catch (err) {
                res.status(500).send(err);
            }
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                            Get Projects by tags                            */
    /* -------------------------------------------------------------------------- */
    router.get("/bytags", async function (req, res) {
        if (!req.body.hasOwnProperty("tags")) {
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
        } else {
            var searchTags = req.body.tags;
            //Make it an array of one just for ease of use
            if (!Array.isArray(searchTags)) {
                searchTags = [searchTags];
            }
            try {
                var matchedProjects = await projectModel.find({ tags: { $all: searchTags } });
                res.status(200).json(matchedProjects);
            } catch (err) {
                res.status(500).send(errors);
            }
        }
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

            usersProjects = await projectModel.find({ ownerID: thisUser._id }).sort("-date");

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
