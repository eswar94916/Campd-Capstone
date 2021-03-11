require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//for grid fs

//import routes
//const projectroutes = require("./routes/ProjectRoute");
//const userroutes = require("./routes/UserRoute");
const path = require("path");

require("./models/User.js");
require("./models/Project.js");

// DB Config
const db = process.env.MONGO_URI;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let gfs2;
// Connect to MongoDB
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(function () {
        console.log("connected to mongodb");

        //this handles downloads only!
        gfs2 = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads",
        });
        app.use("/", require("./routes/router")(gfs2));

        if (process.env.NODE_ENV === "production") {
            app.use(express.static("client/build"));

            app.get("/*", (req, res) => {
                res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
            });
        }

        const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
        app.listen(port, () => console.log(`Server up and running on port ${port} !`));
    })
    .catch((err) => console.log(err));
