const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        default: null
    },
    otpExpire: {
        type: Date,
    }

});

authSchema.pre('save', async function () {
  // Only hash if password is modified or new
  if (!this.isModified('password')) return ;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    res.status().send({ message: "server error" })
  }
});

authSchema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};


module.exports = mongoose.model("user", authSchema);