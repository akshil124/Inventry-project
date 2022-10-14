const mongoose = require("mongoose");

const Orederschema = mongoose.Schema({
    productname : {
        type : String,
    },
    prize : {
        type : String,
    },
    quantity : {
        type : Number
    },
    prizes : {
        type : Number
    },
    image : {
        type : String
    },
    status : {
        type : String,
        default : 'pending'
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
})

const Orders = mongoose.model("Orders",Orederschema)
module.exports = Orders;