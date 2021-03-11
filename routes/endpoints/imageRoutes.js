const mongoose = require("mongoose");
const router = require("express").Router();

module.exports = function (gfs) {
    console.log(gfs);
    router.get("/:filename", (req, res) => {
        console.log("here!!!!!!!!!!!!!!!!!!!!!!!");
        const file = gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            console.log(err, files);
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist",
                });
            }
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    });

    return router;
};
