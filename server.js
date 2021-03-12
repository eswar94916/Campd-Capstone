//Load the environment variables
require("dotenv").config();

//Base requirement modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");

/**
 * Load the models first so they can be used
 * more easily in other files
 */
require("./models/User.js");
require("./models/Project.js");

//misc server setup stuff
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let gfs; //this is for file uploading but it needs mongoose connected first
mongoose
    //connect to mongoDB using the URI provided
    .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    /**
     * Everything happens in the THEN function, once mongoose has sucessfully
     * connected to the database. Otherwise we have no reason to start the
     * server if we can't connect.
     */
    .then(function () {
        console.log("connected to mongodb");

        /**
         * This GridFSBucket is part of MongoDB and it can handle grabbing
         * files and sending them back as a download or resource. It is not
         * for uploading, that is in the upload routes
         */
        gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads",
        });

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
