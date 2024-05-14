const express = require("express")
const router = express.Router()
const { inboxController } = require("../controllers/inboxController")
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse")
const {isAuthenticated} = require('../middleware/authMiddleware')


router.get('/', decorateHtmlResponse('Inbox Page'), isAuthenticated, inboxController)


module.exports = router