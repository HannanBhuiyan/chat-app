const express = require("express")
const app = express()
const path = require("path")
const config = require('./config/config')
require("./config/db")
const port = config.app.port
const { notFoundHandler, defaultErrorHandler } = require("./middleware/errorMiddleware")
const loginRouter  = require("./routes/loginRouter") 
const usersRouter = require("./routes/usersRouter")
const inboxRouter = require('./routes/inboxRouter')
const decorateHtmlResponse = require("./middleware/decorateHtmlResponse")

// setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// setup view engine
app.set("view engine", "ejs")
app.set("views", "views")


// setup static folder
app.use(express.static( path.join(__dirname, "public")))


// routing setup
app.use('/', loginRouter)
app.use("/users", usersRouter)
app.use("/inbox", inboxRouter)


// use middleware
app.use(decorateHtmlResponse())



// error handling
app.use(notFoundHandler)
app.use(defaultErrorHandler)


app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})