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
         if(r.path === '/'){
              app.get(r.path, r.handler)
         }
         else {
              app.use(r.path, r.handler)
         }
    })
}