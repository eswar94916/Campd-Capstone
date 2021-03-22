const router = require("express").Router();
var crypto = require("crypto");
var multer = require("multer");
var path = require("path");
var GridFsStorage = require("multer-gridfs-storage");

module.exports = function (gfs) {
    const storage = new GridFsStorage({
        url: process.env.MONGO_URI,
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

    router.post("/cover-image", upload.single("cover-image"), (req, res) => {
        console.log("new file: " + req.file.originalname);
        res.send(req.file);
    });

    router.post("/user-guide", upload.single("user-guide"), (req, res) => {
        console.log("new file: " + req.file.originalname);
        res.send(req.file);
    });

    router.post("/developer-guide", upload.single("developer-guide"), (req, res) => {
        console.log("new file: " + req.file.originalname);
        res.send(req.file);
    });

    router.post("/installation-guide", upload.single("installation-guide"), (req, res) => {
        console.log("new file: " + req.file.originalname);
        res.send(req.file);
    });

    router.delete("/:filename", (req, res) => {
        gfs2.files.findOne({ filename: req.params.filename }, (err, file) => {
            gfs.remove({ _id: file._id, root: "uploads" }, (err, gridStore) => {
                if (err) {
                    return res.status(404).json({ err: "could not delete" });
                }
                res.redirect("/");
            });
        });
    });

    return router;
};
