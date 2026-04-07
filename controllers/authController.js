const { mailsending } = require("../helpers/mailServices");
const { isValidateEmail, generateOTP } = require("../helpers/utils")
const { validatePassword} = require("../helpers/utils");
const authSchema = require("../models/authSchema");

const registration = async (req, res)=>{
    const { fullName, email, password } = req.body

    try {
        if(!fullName?.trim()) return res.status(400).send({ message: "FullName is required"});
        if(!email) return res.status(400).send({ message: "email is required"});
        if(!isValidateEmail(email)) return res.status(400).send({ message: "email is invalidate"});
        if(!password) return res.status(400).send({ message: "password is required"});
         if(!validatePassword(password))return res.status(400).send({ message: "password is invalidate"});
         
         const existingEmail = await authSchema.findOne({email});

         if(existingEmail) return res.status(400).send({ message: "This Email is already registered"});

        //  generate otp

        const otp_number = generateOTP();

         const user = await authSchema({ fullName, email, password, otp: otp_number, otpExpire: date.now() + 10 * 60 * 1000, })
         user.save()

         await mailsending({ email, subject: "otp verification mail", otp: otp_number })

        res.status(200).send({ message: "registration successfully"})
    } catch (error) {
        res.status(500).send({ message: "internal server is error"})
        
    }
}

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
    const user = await authSchema.findOneAndUpdate({ 
     email,
     otp,
     otpExpire: { $tg: Date.now()},
      }, 

     { isVerified : true, otp: null },
     { returnDocument : "after" },
);
   if(!user) return res.status(400).send({ message: "Invalid request" });
   
   res.status(200).send({ message: "email verified successfully" });
        
    } catch (error) {
        
    }

}


module.exports = { registration, verifyOTP }