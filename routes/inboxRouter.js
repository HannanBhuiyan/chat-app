const express = require("express")
const router = express.Router()
const { inboxController } = require("../controllers/inboxController")
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse")



router.get('/', decorateHtmlResponse('Inbox Page'), inboxController)


module.exports = router