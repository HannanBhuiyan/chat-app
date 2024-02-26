const express = require("express")
const router = express.Router()
const { getLoginController } = require("../controllers/loginController")
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse")



router.get("/", decorateHtmlResponse('Login Page'), getLoginController)


module.exports = router