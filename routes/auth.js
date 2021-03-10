const jwt = require("express-jwt");

const getTokenFromHeaders = (req) => {
    const {
        headers: { authorization },
    } = req;
    console.log(authorization);
    if (authorization && authorization.split(" ")[0] === "Token") {
        return authorization.split(" ")[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: process.env.ACCESS_SECRET,
        getToken: getTokenFromHeaders,
        algorithms: ["HS256"],
    }),
    optional: jwt({
        secret: process.env.ACCESS_SECRET,
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms: ["HS256"],
    }),
};

module.exports = auth;
