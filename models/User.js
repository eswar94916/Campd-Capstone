const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

/**
 * Stores data about a local user. This will only
 * be created once someone logs in to the site.
 */
const User = new Schema({
    euid: { type: String, required: true },
    //UNT euid of user

    name: { type: String, required: true },
    //First name of the user (pulled from LDAP)

    lastname: { type: String, required: true },
    //Last name of the user (pulled from LDAP)

    emails: [String],
    //List of all emails associated with this user (pulled from LDAP)

    email: { type: String, required: true },
    //Holds the first email in the full list of emails from LDAP

    password: { type: String },
    //DEPRECATED: used in the old project when users created only local accounts

    isAdmin: { type: Boolean, required: true },
    //Whether or not this user is a site admin

    //all unused ideas
    ownerProjectIDs: [String],
    sponsorProjectIDs: [String],
    contributorProjectIDs: [String],
    //all unused ideas

    date: { type: Date, default: Date.now },
    //date this user model was created (first login)
});

/**
 * This creates a new JWT and fills the payload with the euid
 * and the _id of the requesting user
 */
User.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 1);
    //24 hour expiration date

    return jwt.sign(
        {
            name: this.name,
            email: this.email,
            lastname: this.lastname,
            isAdmin: this.isAdmin,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        },
        process.env.SECRET_OR_KEY
    );
};

/**
 * Returns a new signed JWT in the format we want
 */
User.methods.toAuthJSON = function () {
    return {
        success: true,
        token: "Bearer" + this.generateJWT(),
    };
};

module.exports = mongoose.model("User", User);
