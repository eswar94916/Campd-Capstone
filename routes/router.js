var express = require("express");
var router = express.Router();

const auth = require("./auth");

/**
 * gfs here is the configured grid file stream
 * object to access uploaded images. It's only
 * actually used in uploadRoutes and imageRoutes,
 * but we just never took it out of the other ones.......
 */
module.exports = function (gfs) {
    /**
     * Every route uses auth.optional so we always
     * have req.body filled even if login is not
     * rewuired on a route
     */
    router.use(auth.optional);

    //Pulling in all the separate route definitions
    router.use("/users", require("./endpoints/userRoutes.js"));
    router.use("/projects", require("./endpoints/projectRoutes.js")(gfs));
    router.use("/upload", require("./endpoints/uploadRoutes.js")(gfs));
    router.use("/image", require("./endpoints/imageRoutes.js")(gfs));
    router.use("/import", require("./endpoints/importRoutes.js"));
    router.use("/export", require("./endpoints/exportRoutes.js")(gfs));

    return router;
};
