const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    
    avatar: {
        type: String,
        default: ""
    },

     fullName: {
        type: String,
        required: true,
        trim: true
    },
     email: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        
        type: String,
        required: true
    },
    otpExpire: {
        type: Date,
    }

});


module.exports = mongoose.model("user", authSchema);