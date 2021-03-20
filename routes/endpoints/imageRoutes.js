const router = require("express").Router();
const auth = require("../auth");

module.exports = function (gfs) {
    router.get("/:filename", (req, res) => {
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
