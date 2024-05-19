const userRouter = require('./userRouter')
const loginRouter = require("./loginRouter")
const inboxRouter = require("./inboxRouter") 

const routes = [
     {
          path: '/',
          handler: loginRouter
     },
     {
         path: '/inbox',
         handler: inboxRouter
     },
     {
          path: '/users',
          handler: userRouter
     }
    
]


module.exports = app => {
    routes.forEach(r => {
          app.use(r.path, r.handler)
    })
}