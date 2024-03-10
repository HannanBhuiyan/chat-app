const express = require("express")
const router = express.Router() 
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse")
const upload = require("../middleware/uploadMiddleware")
const signupValidator = require("../validator/auth/signupValidator") 
const { userGetController, createUserController } = require("../controllers/userController")



router.get('/signup', decorateHtmlResponse('User Page'), userGetController)

router.post("/signup",
    decorateHtmlResponse('User Registration'),
    upload.single('avater'), 
    signupValidator,
    createUserController 
)



module.exports = router