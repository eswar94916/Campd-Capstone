const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Project = new Schema(
    {
        name: { type: String },
        //Name of this project

        owner: { type: String },
        //Descriptive text of owner(s) name(s)

        ownerID: { type: String },
        //database ID of the lcoal user who owns this project

        contactInfo: { type: String },
        //descriptive text of owner(s) email(s)

        status: { type: String },
        //DEPRECATED not used anymore

        /**
         * Object to hold all the available status flags
         * isRecruiting and isApproved are independant,
         * but all other flags are mutually exclusive
         *
         * A project can only have one of the following
         * flags true at one time: [isProposal, isActive,
         * isRecruiting, isPaused, isStopped, isArchived]
         *
         * isNew is not currently used
         */
        statuses: {
            isApproved: Boolean, //whether or not an admin has approved the project
            isRecruiting: Boolean, //current owners looking for new members

            //These 5 are mutually exclusive
            isProposal: Boolean, //no development has happened yet
            isActive: Boolean, //project currently being developed
            isPaused: Boolean, //still owned, but not being developed
            isStopped: Boolean, //not owned but could be taken over
            isArchived: Boolean, //no longer owned or available

            isNew: Boolean, //currently unused
        },

        description: { type: String },
        //long text description of the project

        gitRepo: { type: String },
        //link to the git repo

        tags: [
            {
                type: String,
                lowercase: true,
            },
        ],
        //array of lowercase tags for the project

        image: { type: String },
        //filename of the associated image

        //UNUSED
        userGuide: { type: String },
        developerGuide: { type: String },
        installationGuide: { type: String },
        //UNUSED

        date: {
            type: Date,
            default: new Date().getTime(), //store as int to make sorting easier
        },
        //date this project was created
    },
    {
        collection: "projects",
    }
);

/**
 * Index fields for easy searching
 */
Project.index(
    {
        name: "text",
        description: "text",
    },
    {
        weights: {
            name: 5,
            description: 3,
        },
    }
);

/**
 * Static methods for this object type
 */
Project.statics = {
    /**
     * Search projects for query using regex
     */
    searchPartial: function (q, callback) {
        return this.find(
            {
                $or: [
                    {
                        name: new RegExp(q, "gi"),
                    },
                    {
                        description: new RegExp(q, "gi"),
                    },
                ],
            },
            callback
        );
    },

    /**
     * Search using indexes
     */
    searchFull: function (q, callback) {
        return this.find(
            {
                $text: {
                    $search: q,
                    $caseSensitive: false,
                },
            },
            callback
        );
    },

    /**
     * Main search used by outisde calls
     */
    search: function (q, callback) {
        this.searchFull(q, (err, data) => {
            if (err) return callback(err, data);
            if (!err && data.length) return callback(err, data);
            if (!err && data.length === 0) return this.searchPartial(q, callback);
        });
    },
};

module.exports = mongoose.models.Post || mongoose.model("Project", Project);
