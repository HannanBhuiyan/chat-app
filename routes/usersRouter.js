const express = require("express")
const router = express.Router()
const { getUserContrller } = require("../controllers/usersController")
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse")



router.get('/', decorateHtmlResponse('User Page'), getUserContrller)


module.exports = router