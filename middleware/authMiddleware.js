const People  = require("../models/People")


exports.bindUserWithRequest = () => {
    return async (req, res, next) => {

        if(!req.session.isLoggedIn) {
            return next()
        }
        try {
            
            let user = await People.findById(req.session.user._id)
            if(user) {
                req.user = user
                next()
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

exports.isAuthenticated = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/')
    }
    next()
}

exports.isUnAuthnticated = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/inbox')
    }
    next()
}