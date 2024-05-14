const express = require("express")
const app = express()
const path = require("path")
const config = require('./config/config')
require("./config/db")
const port = config.app.port 
const setMiddleware = require('./middleware/middleware')
const setRouter = require("./routes/routes")
const { notFoundHandler, defaultErrorHandler } = require("./middleware/errorMiddleware")


// setup view engine
app.set("view engine", "ejs")
app.set("views", "views")




// using middleware from 
setMiddleware(app);

// routing setup
setRouter(app)


// not found middleware
app.use(notFoundHandler)
app.use(defaultErrorHandler)
 

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})