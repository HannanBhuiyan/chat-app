const People = require("../models/People")
const { validationResult } = require("express-validator")
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.userGetController = (req, res, next) => {
    res.render("users", 
    {
        error: {}
    })
}

exports.createUserController = async (req, res, next) => {

    const { username, email, mobile, password } = req.body

    const result = validationResult(req).formatWith((err) => err.msg)


    if(!result.isEmpty()){
        res.render('users', {
            error: result.mapped(),
            value: { username, email, mobile, password }
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
            return res.redirect("/")

        }
        catch(error){
            res.status(500).send(error)
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