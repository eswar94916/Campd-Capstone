var express = require("express");
var router = express.Router();

const auth = require("./auth");

module.exports = function (gfs) {
    router.use(auth.optional);
    router.use("/users", require("./endpoints/userRoutes.js"));
    router.use("/projects", require("./endpoints/projectRoutes.js")(gfs));
    router.use("/upload", require("./endpoints/uploadRoutes.js")(gfs));
    router.use("/image", require("./endpoints/imageRoutes.js")(gfs));
    router.use("/import", require("./endpoints/importRoutes.js")(gfs));
    router.use("/export", require("./endpoints/exportRoutes.js")(gfs));

    return router;
};
