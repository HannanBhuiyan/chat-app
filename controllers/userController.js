const People = require("../models/People")
const { validationResult } = require("express-validator")
const bcrypt = require('bcrypt');
const saltRounds = 10;

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


    if(Object.keys(mappedErrors).length !== 0 ){
        res.status(500).json({
            errors: mappedErrors
        })
    }
    
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
            return res.redirect('/inbox') 

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
        res.json({ error: "image field is required" })
    }
    
  
}


exports.logoutController = (req, res, next) => {

    req.session.destroy((err) => {
        if (err) {
            res.status(400).send('Unable to log out')
          } else {
            return res.redirect('/')
        }
    } )


}