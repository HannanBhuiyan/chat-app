const express = require("express")
const router = express.Router() 
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse") 
const { loginGetController } = require("../controllers/loginController")




router.get("/", decorateHtmlResponse('User Login'), loginGetController )




module.exports = router