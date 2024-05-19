const { body } = require("express-validator");
const People = require("../../models/People");
const createError  = require("http-errors")

module.exports = [
    body("username")
    .notEmpty().withMessage("Username is required")
    .isAlpha("en-US", {ignore: " -"})
    .withMessage("Name must be use only alphabet")
    .trim(),

    body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
        try {
            let existsUser =  await People.findOne({email: value})
            if(existsUser) {
                throw createError("Email already used !")
            }
        } catch (error) {
            throw createError(error.message)
        }
    })
    .trim(),

    body("mobile")
    .notEmpty().withMessage("Mobile number is required") 
    .custom(async (value) => {
        try {
            let existsNumber = await People.findOne({ mobile: value })
            if(existsNumber) {
                throw createError("Mobile already used")
            }
        } catch (error) {
            throw createError(error.message)
        }
    })
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
