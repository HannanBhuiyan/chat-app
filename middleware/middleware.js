const express = require("express")
const cors = require("cors")
const decorateHtmlResponse = require("./decorateHtmlResponse")
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('../config/config')
const { bindUserWithRequest } = require('../middleware/authMiddleware');
const setLocals = require("./setLocals"); 
const cookieParser = require('cookie-parser')


var store = new MongoDBStore({
    uri: config.db.url,
    collection: 'sessions'
  });

const middleware = [
    express.json(),
    express.urlencoded({ extended:true }),
    cors(),
    express.static("public"),
    cookieParser(process.env.COOKIE_SECRET),
    decorateHtmlResponse(),
    session({
        secret: process.env.COOKIE_SECRET || "SECRET_KEY",
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setLocals(),
]

module.exports = (app) => {
    middleware.forEach((m) => {
        app.use(m)
    })
}