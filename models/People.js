const { Schema, model } = require("mongoose")

const peopleSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avater: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum : ["admin", "user"],
        default: "user"
    }
},{
    timestamps: true
})

const People = model("People", peopleSchema)
module.exports = People 