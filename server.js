require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//for grid fs
var crypto = require("crypto");
var multer = require("multer");
var GridFsStorage = require("multer-gridfs-storage");

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

        //Create storage engine
        //This handles uploading only!
        const storage = new GridFsStorage({
            url: db,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, (err, buf) => {
                        if (err) {
                            return reject(err);
                        }
                        const filename = buf.toString("hex") + path.extname(file.originalname);
                        const fileInfo = {
                            filename: filename,
                            bucketName: "uploads",
                        };
                        resolve(fileInfo);
                    });
                });
            },
        });

        const upload = multer({ storage });

        //TODO: move all these routes to their own file for organisation
        app.post("/upload/cover-image", upload.single("cover-image"), (req, res) => {
            console.log("new file: " + req.file.originalname);
            res.send(req.file);
        });

        app.post("/upload/user-guide", upload.single("user-guide"), (req, res) => {
            console.log("new file: " + req.file.originalname);
            res.send(req.file);
        });

        app.post("/upload/developer-guide", upload.single("developer-guide"), (req, res) => {
            console.log("new file: " + req.file.originalname);
            res.send(req.file);
        });

        app.post("/upload/installation-guide", upload.single("installation-guide"), (req, res) => {
            console.log("new file: " + req.file.originalname);
            res.send(req.file);
        });

        app.get("/image/:filename", (req, res) => {
            gfs2.files.findOne({ filename: req.params.filename }, (err, file) => {
                //check if files exist
                if (!file) {
                    return res.status(404).json({
                        err: "No file exists",
                    });
                }

                //Check if img
                if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
                    //read output to browser
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    res.status(404).json({
                        err: "Not an image",
                    });
                }
            });
        });

        app.get("/file/:filename", (req, res) => {});

        app.delete("/upload/:filename", (req, res) => {
            gfs2.files.findOne({ filename: req.params.filename }, (err, file) => {
                gfs.remove({ _id: file._id, root: "uploads" }, (err, gridStore) => {
                    if (err) {
                        return res.status(404).json({ err: "could not delete" });
                    }
                    res.redirect("/");
                });
            });
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
