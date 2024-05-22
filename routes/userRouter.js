const express = require("express")
const router = express.Router() 
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse")
const upload = require("../middleware/uploadMiddleware")
const signupValidator = require("../validator/auth/signupValidator") 
const { userGetController, createUserController, logoutController, deleteUser } = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/authMiddleware")


router.get('/', decorateHtmlResponse('User Registration'), isAuthenticated, userGetController)

router.post("/",
    upload.single('avater'), 
    signupValidator,
    isAuthenticated,
    createUserController
)

router.get('/logout', logoutController)
router.delete('/delete/:id', deleteUser)


module.exports = router