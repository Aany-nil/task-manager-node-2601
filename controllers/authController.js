const { mailsending } = require("../helpers/mailServices");
const { isValidateEmail, generateOTP } = require("../helpers/utils")
const { validatePassword} = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const cloudinary = require('../configs/cloudinary');
const { uploadToCloudinary } = require("../helpers/cloudinaryService");

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

         const user = await authSchema({ fullName, email, password, otp: otp_number, otpExpire: Date.now() + 10 * 60 * 1000, })
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
     otpExpire: { $gte: Date.now()},
      }, 

     { isVerified : true, otp: null },
     { returnDocument : "after" },
);
   if(!user) return res.status(400).send({ message: "Invalid request" });
   
   res.status(200).send({ message: "email verified successfully" });
        
    } catch (error) {
      res.status(500).send({ message: "internal server is error"})  
    }
};

const login = async (req, res) => {
    const {email, password}  = req.body;
    try {
        const user = await authSchema.findOne({ email });
        if(!user) return res.status(400).send ({message: "Invalid credential"});
        if(!user.isVerified) return res.status(400).send ({message: "email is not verified"});
        const matchPassword = await user.comparePassword(password)
       if(!matchPassword) return res.status(400).send ({message: "Invalid credential"});

       const accessToken = generateAccessToken({ _id: user._id, email: user.email })
       console.log(accessToken);

       res.cookie("accessToken", accessToken)

       res.status(200).send({ message: "Login successfully" })
    } catch (error) {
         res.status(500).send({ message: "internal server is error"})
    }
}

 const userProfile = async (req, res) => {
  console.log(req.user);

  try {
    const userData = await authSchema.findOne({ _id: req.user._id }).select("avatar email fullName")
    if(!userData) {
        return res.status(404).send({ message: "user not found" })
    }
    res.status(200).send( userData )
  } catch (error) {
     res.status(500).send({ message: "internal server is error"}) 
  }

  res.send("User Profile")
 }

 const updateProfile = async (req, res) => {
    const { fullName } = req.body;
    const userId = req.user._id;
    try {
       const avatarUrl = await uploadToCloudinary({ 
        mimetype: req.file.mimetype, 
        imgBuffer: req.file.buffer 
    });
       res.send(avatarUrl.secure_url);
   
    } catch (error) {
      console.log(error);  
    }
 };




module.exports = { registration, verifyOTP, login, userProfile, updateProfile }