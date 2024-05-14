const express = require("express")
const router = express.Router() 
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse") 
const { loginGetController, loginPostController } = require("../controllers/loginController")
const {isUnAuthnticated} = require("../middleware/authMiddleware")




router.get("/", decorateHtmlResponse('User Login'), isUnAuthnticated, loginGetController )
router.post('/login/post/', isUnAuthnticated, loginPostController)




module.exports = router