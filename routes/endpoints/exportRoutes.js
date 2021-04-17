const mongoose = require("mongoose");
const { Parser } = require("json2csv");
//const fields = ['tags', 'date', '_id','name', 'owner', 'ownerID', 'contactInfo','status', 'description', 'gitRepo', 'image', '__v'];
const router = require("express").Router();
const projectModel = mongoose.model("Project");
const userModel = mongoose.model("User");

const auth = require("../auth");

//Fields are used to determine the necessary fields in a csv file for export. 
const fields = [
    {
        label: "Project Title",
        value: "name",
    },
    {
        label: "Owner",
        value: "owner",
    },
    {
        label: "Owner EUID",
        value: "ownerID",
    },
    {
        label: "Contact Info",
        value: "contactInfo",
    },
    {
        label: "Status: Approved",
        value: "statuses.isApproved",
    },
    {
        label: "Status: New",
        value: "statuses.isNew",
    },
    {
        label: "Status: Proposal",
        value: "statuses.isProposal",
    },
    {
        label: "Status: Active",
        value: "statuses.isActive",
    },
    {
        label: "Status: Recruiting",
        value: "statuses.isRecruiting",
    },
    {
        label: "Status: Paused",
        value: "statuses.isPaused",
    },
    {
        label: "Status: Stopped",
        value: "statuses.isStopped",
    },
    {
        label: "Status: Archived",
        value: "statuses.isArchived",
    },
    {
        label: "Description",
        value: "description",
    },
    {
        label: "Repo Link",
        value: "gitRepo",
    },
    {
        label: "Tags",
        value: "tags",
    },
    {
        label: "Date Created",
        value: "date",
    },
];

const options = { fields };
const parser = new Parser(options);

module.exports = function () {
    router.get("/", auth.admin, async function (req, res) {
        var jsonData = [];
        var allProjects = await projectModel.find({});
        for await (const thisProject of allProjects) {
            var newJsonProject = thisProject.toObject(); //converts specific project to object
            var thisUser = await userModel.findById(thisProject.ownerID);
            newJsonProject.ownerID = thisUser != null ? thisUser.euid : newJsonProject.ownerID; //if there is a euid for the user we will use that if not just use the original ownerID (this could be blank because of import functionality)
            newJsonProject.tags = thisProject.tags.join(", ");
            jsonData.push(newJsonProject);
        }

        try {
            var csv = parser.parse(jsonData); //parses the json data and converts it to a csv file. 
        } catch (err) {
            return res.status(500).json({ err });
        }
        res.setHeader("Content-disposition", "attachment; filename=research_projects.csv");
        res.set("Content-Type", "text/csv");
        res.status(200).send(csv);
    });

    return router;
};
