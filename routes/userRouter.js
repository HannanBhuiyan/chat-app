const express = require("express")
const router = express.Router() 
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse")
const upload = require("../middleware/uploadMiddleware")
const signupValidator = require("../validator/auth/signupValidator") 
const { userGetController, createUserController, logoutController } = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/authMiddleware")


router.get('/signup', decorateHtmlResponse('User Registration'), isAuthenticated, userGetController)

router.post("/signup",
    upload.single('avater'), 
    signupValidator,
    isAuthenticated,
    createUserController
)

router.get('/logout', logoutController)


module.exports = router