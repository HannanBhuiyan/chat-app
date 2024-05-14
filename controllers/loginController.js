const People = require("../models/People")
const bcrypt = require('bcrypt');

exports.loginGetController = (req, res, next) => {

 

    res.render("login", 
    {
        error: {}
    })
}
exports.loginPostController = async (req, res, next) => {
    

    const {password, email} = req.body

    try {
        
        let existstUser = await People.findOne({email})

        if(!existstUser) {
            return res.json({
                message: "Email not found"
            })
        }

        let match = await bcrypt.compare(password, existstUser.password )

        if(!match) {
            return res.json({
                message: "Password does not match"
            })
        }

        req.session.isLoggedIn = true;
        req.session.user = existstUser

        req.session.save((error) => {
            if(error) {
                return req.json({message: "Session error"})
            }
            return res.redirect('/inbox')
        })

 

    } catch (e) {
        res.status(500).send(e)
    }


   


}

