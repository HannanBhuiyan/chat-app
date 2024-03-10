const express = require("express")
const cors = require("cors")
const decorateHtmlResponse = require("./decorateHtmlResponse")


const middleware = [
    express.json(),
    express.urlencoded({ extended:true }),
    cors(),
    express.static("public"),
    decorateHtmlResponse()
]

module.exports = (app) => {
    middleware.forEach((m) => {
        app.use(m)
    })
}