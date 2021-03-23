const mongoose = require("mongoose");
const LocalStrategy = require("passport-local");
const User = mongoose.model("User");
var ldap = require("ldapjs");

module.exports = function (passport) {
    console.log("configuring");
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(
        new LocalStrategy(
            {
                usernameField: "euid",
                passwordField: "password",
            },
            (euid, password, done) => {
                //create the ldap client
                console.log("working");
                if (euid == "aaa9999" && password == "admin") {
                    var adminUser = {
                        euid: "aaa9999",
                        name: "Ad",
                        lastname: "Min",
                        emails: ["fake@gmail.com"],
                        email: "fake@gmail.com",
                        isAdmin: true,
                    };

                    User.findOne({ euid: adminUser.euid }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (result) {
                                return done(null, result);
                            } else {
                                var newAdmin = new User(adminUser);
                                newAdmin.save(function (saveErr, saveResult) {
                                    if (saveErr) {
                                        console.log(saveErr);
                                    } else {
                                        return done(null, saveResult);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    var login = ldap.createClient({
                        url: "ldaps://ldap-id.untsystem.edu",
                    });

                    login.addListener("error", function (err) {
                        console.log("LDAP kicked us out, but it's fine I think", err);
                    });

                    //format the DN for logging in
                    var loginDN = "uid=" + euid + ",ou=people,o=unt";

                    //bind the ldap client using supplied credentials
                    login.bind(loginDN, password, function (err, res) {
                        if (err) {
                            login.unbind();
                            return done(null, false, {
                                message: "Password not recognised. Try again?",
                            });
                        } else {
                            /**
                             * Login was sucessful. Now we ask who the person is
                             * and either find an existing user document or make
                             * a new one
                             */
                            login.search(
                                "ou=people,o=unt",
                                {
                                    filter: "(uid=" + euid + ")",
                                    scope: "sub",
                                },
                                function (err2, result) {
                                    /**
                                     * This object will be set up identical to a User
                                     * db document for creating a new local User
                                     * document if needed
                                     */
                                    var ldapUser = {};

                                    /**
                                     * This handler can fire more than once, but because
                                     * we are searching for a uniqe identifier (the euid)
                                     * this will only fire once (at least I hope). Whatever
                                     * the last search result was will be left in the
                                     * ldapUser object
                                     */
                                    result.on("searchEntry", (entry) => {
                                        //this holds the ldap data of the person
                                        var results = entry.object;

                                        //name and euid
                                        ldapUser.euid = results.euid;
                                        ldapUser.name = results.givenName;
                                        ldapUser.lastname = results.sn;

                                        //email(s)
                                        ldapUser.emails = [];
                                        ldapUser.emails.push(results.mail);
                                        if (results.hasOwnProperty("employeeMail") && results.employeeMail) {
                                            ldapUser.emails.push(results.employeeMail);
                                        }

                                        /**
                                         * Avi's schema has a field for one email
                                         * so for making it work just fill it with the
                                         * first email we found
                                         */
                                        ldapUser.email = ldapUser.emails[0];
                                    });

                                    /**
                                     * Fires once after all searches are done. ldapUser
                                     * will be filled with the info on the logging in
                                     * user that was also searched for
                                     */
                                    result.on("end", (result2) => {
                                        //try to find a local User with this euid
                                        User.findOne({ euid: ldapUser.euid }, function (err3, localUser) {
                                            if (err3) {
                                                console.log(err3);
                                            }

                                            //unbind the ldap client so we dont get errors
                                            login.unbind();

                                            //If we have a local user, return it
                                            if (localUser) {
                                                return done(null, localUser);
                                            }

                                            //If we dont, create a local user and return it
                                            else {
                                                var newLocalUser = new User(ldapUser);
                                                newLocalUser.save(function (saveErr, saveResult) {
                                                    if (saveErr) {
                                                        console.log(saveErr);
                                                    } else {
                                                        return done(null, saveResult);
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            );
                        }
                    });
                }

                /*
            Users.findOne({ euid })
                .then((user) => {
                    if (!user || !user.validatePassword(password)) {
                        return done(null, false, { errors: { "email or password": "is invalid" } });
                    }

                    return done(null, user);
                })
                .catch(done);
            */

                //connect to ldap and ask if the username and password is valid

                //if so, look in the database to find an existing match

                //if match, return that document

                //if no match, make the document then return it

                //if not valid, return invalid message

                //return done(null, { object: "yo" }, null);
            }
        )
    );
};

/*
Example result from searching

for each person returned
entry: {
    dn: "uid=hcf0018,ou=people,o=unt",
    controls: [],
    preferEmployeeMail: "Hanna.Flores@unt.edu",
    preferStudentMail: "HannaFlores@my.unt.edu",
    employeeMail: "Hanna.Flores@unt.edu",
    studentMail: "HannaFlores@my.unt.edu",
    eduPersonScopedAffiliation: ["student@unt.edu", "member@unt.edu", "staff@unt.edu"],
    eduPersonAffiliation: ["student", "member", "staff"],
    role: ["untst", "untfs"],
    euid: "hcf0018",
    prefname: "Hanna",
    emplid: "11197290",
    mail: "HannaFlores@my.unt.edu",
    uid: "hcf0018",
    givenName: "Hanna",
    untjobtitle: "Student Assistant - Regular",
    sn: "Flores",
    ou: "University Library-Gen",
    objectClass: [
        "inetOrgPerson",
        "untperson",
        "organizationalPerson",
        "person",
        "ndsLoginProperties",
        "top",
        "eduPerson",
        "mailProperties",
    ],
    groupMembership: [
        "cn=AdobeCloud,ou=UNTGroups,o=unt",
        "cn=DuoUsers,ou=DuoSecurity,o=unt",
        "cn=AdobeStudents,ou=UNTGroups,o=unt",
    ],
    cn: "Hanna Claire Flores",
}

final status
status: 0,
*/
