const { body } = require("express-validator")

module.exports = [
    body("username")
    .notEmpty().withMessage("Username is required")
    .trim(),

    body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .trim(),

    body("mobile")
    .notEmpty().withMessage("Mobile number is required")
    .trim(),

    body("password")
    .notEmpty().withMessage("Password field is required")
    .trim(),

    body("confirm_password")
    .notEmpty().withMessage("Confirm password is not empty")
    .custom((confirm_password, {req}) => {
        if(confirm_password !== req.body.password) {
            throw new Error("Password does not match")
        }
        return true;
    }),
 
]
