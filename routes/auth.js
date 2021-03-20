const jwt = require("express-jwt");

const getTokenFromHeaders = (req) => {
    const {
        headers: { authorization },
    } = req;
    console.log("Auth headers", authorization);
    if (authorization && authorization.substring(0, 6) === "Bearer") {
        return authorization.substring(6);
    }
    return null;
};

const auth = {
    required: jwt({
        secret: process.env.SECRET_OR_KEY,
        getToken: getTokenFromHeaders,
        algorithms: ["HS256"],
    }),
    optional: jwt({
        secret: process.env.SECRET_OR_KEY,
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms: ["HS256"],
    }),
};

var requireLogin = function (req, res, next) {
    console.log("Checking user authentication on route", req.url);
    auth.required(req, res, function (err) {
        if (err && err.name === "UnauthorizedError") {
            return res.status(401).send("Login again");
        } else {
            return next();
        }
    });
};

module.exports = requireLogin;
