const People = require("../models/People")
const { validationResult } = require("express-validator")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require("fs")

exports.userGetController = async (req, res, next) => {
    try {
        let allUsers = await People.find()
        res.render("users", 
        {
            error: {},
            allUsers: allUsers,
        })
    } catch (error) {
        res.status(500).send(error)
    }

}

exports.createUserController = async (req, res, next) => {

    const { username, email, mobile, password } = req.body

    // const result = validationResult(req).formatWith((err) => err.msg)

    const errors = validationResult(req)
    const mappedErrors = errors.mapped()

    if(Object.keys(mappedErrors).length !== 0) {
        res.status(500).json({
            errors: mappedErrors
        })
    }
    else {
        if(req.file) {
            let hashPassword = await bcrypt.hash(password, saltRounds)
            try {
                images = `/uploads/${req.file.filename}`
                const newUser = new People({
                    username,
                    email,
                    mobile,
                    password: hashPassword,
                    avater: images
                })
                await newUser.save() 
                res.status(200).json({
                    message: "User added successfully"
                })
            }
            catch(error){
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Unknown error occured"
                        }
                    }
                })
            }
        }
        else {
            res.status(500).json({
                errors: {
                    avater: {
                        msg: "image field is required" 
                    }
                }
            })
        }
    }
}

exports.logoutController = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send('Unable to log out')
          } else {
            return res.redirect('/')
        }
    })
}

exports.deleteUser = async (req, res, next) => {

    try {
        let users = await People.findByIdAndDelete({_id: req.params.id})
        console.log(users.avater)
        if(users.avater) {
            fs.unlink("./public/"+users.avater, (error) => {
                if(error) console.log(error)
            })
        }
        res.status(200).json({
            message: "User remove successfully"
        })

    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Could not delete user"
                }
            }
        })
    }

}