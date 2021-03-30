const jwt = require("express-jwt");
const mongoose = require("mongoose");
const userModel = mongoose.model("User");

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

var requireAdmin = function (req, res, next) {
    console.log("Requiring admin status on route", req.url),
        auth.required(req, res, function (err) {
            if (err && err.name === "UnauthorizedError") {
                return res.status(401).send("Login again");
            } else {
                userModel.findById(req.user.id, function (error, thisUser) {
                    if (error) {
                        return res.status(500).send("DB error");
                    } else {
                        if (thisUser.isAdmin) {
                            return next();
                        } else {
                            return res.status(402).send("User is not an admin");
                        }
                    }
                });
            }
        });
};

var optionalUser = function (req, res, next) {
    console.log("Optional login on route ", req.url);
    auth.optional(req, res, function (err) {
        return next();
    });
};

module.exports = {
    admin: requireAdmin,
    required: requireLogin,
    optional: optionalUser,
};
