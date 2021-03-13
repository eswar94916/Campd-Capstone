//Load the environment variables
require("dotenv").config();

//Base requirement modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

/**
 * Load the models first so they can be used
 * more easily in other files
 */
require("./models/User.js");
require("./models/Project.js");

const passport = require("passport");
require("./config/passport")(passport);

/**
 * Set flags to avoid deprecation warnings. In the current version
 * of mongoose, the warnings still show up, but they can safely be
 * ignored (so says google)
 */
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

let gfs; //this is for file uploading but it needs mongoose connected first
mongoose
    //connect to mongoDB using the URI provided
    .connect(process.env.MONGO_URI)
    /**
     * Everything happens in the THEN function, once mongoose has sucessfully
     * connected to the database. Otherwise we have no reason to start the
     * server if we can't connect.
     */
    .then(() => {
        /**
         * This GridFSBucket is part of MongoDB and it can handle grabbing
         * files and sending them back as a download or resource. It is not
         * for uploading, that is in the upload routes
         */
        gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads",
            useUnifiedTopology: true,
        });

        var app = express();

        app.use(express.urlencoded({ extended: true })); //parse URL ecoded data
        app.use(express.json()); //parse incoming JSON data
        app.use(passport.initialize()); //use our initialised passport instance
        app.use(cors()); //default CORS config

        /**
         * grab the root file of the router and pass it the configured
         * file downloader GFS Bucket to be used in the routes
         * that need to download things
         */
        app.use("/", require("./routes/router")(gfs));

        /**
         * Only if we are in production, serve the static build of the
         * react app and send it to the browser
         */
        if (process.env.NODE_ENV === "production") {
            app.use(express.static("client/build"));

            app.get("/*", (req, res) => {
                res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
            });
        }

        /**
         * Start running the backend server on whatever port
         * we set it up to use
         */
        const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
        app.listen(port, () => console.log(`Server up and running on port ${port} !`));
    })
    /**
     * We died.
     */
    .catch((err) => console.log(err));

function startServer(gfs) {
    console.log("connected to mongodb");
}
