const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const path = require("path");
const router = require("express").Router();
const auth = require("../auth");
const projectModel = mongoose.model("Project");
const userModel = mongoose.model("User");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const validStatuses = ["isProposal", "isActive", "isPaused", "isStopped", "isArchived"];
const evalTrue = ["yes", "true", "1", "y"];
const euidReg = /^[A-Za-z]{2,3}[0-9]{4}$/;

router.post("/", auth.admin, upload.single("csvFile"), async function (req, res) {
    //console.log(String(req.file.buffer));
    var csvString = String(req.file.buffer);
    var json = await csvtojson({
        headers: ["name", "description", "owner", "euid", "contactInfo", "github", "status", "recruiting", "tags"],
        colParser: {
            euid: function (input) {
                return input.toLowerCase();
            },
            status: function (input) {
                return "is" + input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            },
            tags: function (input) {
                if (input) {
                    return input.replace(/, /g, ",");
                } else {
                    return null;
                }
            },
            recruiting: function (input) {
                if (evalTrue.includes(input.toLowerCase())) {
                    return true;
                } else {
                    return false;
                }
            },
        },
    }).fromString(csvString);

    var errorMessages = [],
        numSaved = 0;

    for await (const thisLine of json) {
        try {
            /**
             * Validate all required fields
             */
            if (!thisLine.name)
                throw {
                    error: "Project requires a name",
                    line: thisLine,
                };
            if (!thisLine.description)
                throw {
                    error: "Project requires a description",
                    line: thisLine,
                };
            if (!validStatuses.includes(thisLine.status))
                throw {
                    error: "Project requires a status",
                    line: thisLine,
                };
            if (!thisLine.owner)
                throw {
                    error: "Project requires an owner",
                    line: thisLine,
                };
            if (!thisLine.contactInfo)
                throw {
                    error: "Project requires contact info",
                    line: thisLine,
                };

            /**
             * Parse tags into an array. Leave empty if unset
             */
            var tagArray = [];
            if (thisLine.tags) {
                tagArray = thisLine.tags.split(",");
            }

            /**
             * Create default statuses and set with data from csv
             */
            var tempStatuses = {
                isApproved: true,
                isRecruiting: thisLine.recruiting,
                isProposal: false,
                isActive: false,
                isPaused: false,
                isStopped: false,
                isArchived: false,
            };
            tempStatuses[thisLine.status] = true;

            /**
             * Fill an object with data matching db schema
             */
            var tempProject = {
                name: thisLine.name,
                owner: thisLine.owner,
                statuses: tempStatuses,
                contactInfo: thisLine.contactInfo,
                description: thisLine.description,
                gitRepo: thisLine.github,
                tags: tagArray,
                date: new Date(),
            };

            /**
             * Optionally try to find an existing user by their EUID
             */
            var localUser;
            if (thisLine.euid.match(euidReg)) {
                localUser = await userModel.findOne({ euid: thisLine.euid });
            }

            /**
             * If we didnt get a user from the euid, try the email
             */
            if (!localUser && thisLine.contactInfo.slice(thisLine.contactInfo.length - 7) == "unt.edu") {
                localUser = await userModel.findOne({ emails: thisLine.contactInfo });
            }

            if (localUser) {
                tempProject.ownerID = localUser._id;
                tempProject.owner = localUser.name + " " + localUser.lastname;
                tempProject.contactInfo = localUser.email;
            }
            var newProject = new projectModel(tempProject);
            //commented not to save for real
            //await newProject.save()
            numSaved++;
        } catch (err) {
            if (err.line) {
                errorMessages.push(err);
            }
        }
    }

    res.json({
        savedFiles: numSaved,
        errors: errorMessages,
    });
});

module.exports = router;
