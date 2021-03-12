const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

// Create Schema
const User = new Schema({
    euid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    emails: [String],
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    flags: {
        isStudent: Boolean,
        isEmployee: Boolean,
        isAdmin: Boolean,
    },
    ownerProjectIDs: [String],
    sponsorProjectIDs: [String],
    contributorProjectIDs: [String],
    date: {
        type: Date,
        default: Date.now,
    },
});

/**
 * This creates a new JWT and fills the payload with the euid
 * and the _id of the requesting user
 */
User.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 1);

    return jwt.sign(
        {
            euid: this.euid,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        },
        process.env.ACCESS_SECRET
    );
};

/**
 * This creates a JSON object containing the unencrypted User
 * document for the requesting user, and it creates a new JWT
 * for the user as defined above.
 *
 * This is the only method that is actually called from other places.
 * generateJWT could be called, but it wouldnt have easily readable
 * data about the user for the frontent.
 *
 * Validation will still happen on the back end using the payload
 * in the token, but the easy data here is for the frontend
 */
User.methods.toAuthJSON = function () {
    return {
        userData: this,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model("User", User);
