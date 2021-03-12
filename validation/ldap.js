const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLDAPInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.euid = !isEmpty(data.euid) ? data.euid : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.euid) || !Validator.isAlphanumeric(data.euid)) {
        errors.euid = "EUID field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "EUID is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
