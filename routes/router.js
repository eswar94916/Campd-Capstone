var express = require("express");
var router = express.Router();

//use our preconfigured authentication
const auth = require("./auth");

module.exports = function (gfs) {
    router.use("/users", require("./endpoints/userRoutes.js"));
    router.use("/projects", require("./endpoints/projectRoutes.js")(gfs));
    router.use("/upload", require("./endpoints/uploadRoutes.js")(gfs));
    router.use("/image", require("./endpoints/imageRoutes.js")(gfs));
    router.use("/import", require("./endpoints/importRoutes.js")(gfs));

    return router;
};

// check for logged in user unless otherwise specified
/**
router.use(function (req, res, next) {
    console.log("checking user authentication");
    if (req.path != "/users/login") {
        auth.required(req, res, function (err) {
            if (err && err.name === "UnauthorizedError") {
                return res.status(401).send("Login again");
            } else {
                return next();
            }
        });
    } else {
        next();
    }
});
*/
