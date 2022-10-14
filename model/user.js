const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
    roll : {
        type : String,
        default : 'user'
    }
})
const User = mongoose.model("User",userschema)
module.exports = User;