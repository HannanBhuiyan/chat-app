const config = require("./config")
const mongoose = require("mongoose")
const db_url = config.db.url

mongoose.connect(db_url)
.then(() => {
    console.log("Database connection success")
})
.catch((error) => {
    console.log("Database connection error!")
    console.log(error)
    process.exit(1)
})