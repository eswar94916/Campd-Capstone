var express = require("express");
var router = express.Router();
const auth = require("./auth");

// check for logged in user unless otherwise specified
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

router.use("/users", require("./endpoints/userRoutes.js"));
router.use("/projects", require("./endpoints/projectRoutes.js"));

module.exports = router;
