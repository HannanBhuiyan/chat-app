const userRouter = require('./userRouter')
const loginRouter = require("./loginRouter")
const inboxRouter = require("./inboxRouter") 

const routes = [
     {
         path: '/inbox',
         handler: inboxRouter
     },
     {
          path: '/users',
          handler: userRouter
     },
     {
          path: '/',
          handler: loginRouter
     },
]


module.exports = app => {
    routes.forEach(r => {
          app.use(r.path, r.handler)
    })
}