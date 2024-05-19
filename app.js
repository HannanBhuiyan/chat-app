const express = require("express")
const app = express()
require("dotenv").config()
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

 
// if (process.env.NODE_ENV === 'production') {
//     console.log('Running in production mode');
// } else if (process.env.NODE_ENV === 'development') {
//     console.log('Running in development mode');
// } else {
//     console.log('Running in an unknown mode or defaulting to development');
// }


// 404 not found handler
app.use(notFoundHandler)

// // common error handler
app.use(defaultErrorHandler)


app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})