const { isValidateEmail } = require("../helpers/utils")
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

         const user = await authSchema({ fullName, email, password })
         user.save()

        res.status(200).send({ message: "registration successfully"})
    } catch (error) {
        res.status(500).send({ message: "internal server is error"})
        
    }
}


module.exports = { registration }