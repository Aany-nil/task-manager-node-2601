const { isValidateEmail } = require("../helpers/utils")
const { validatePassword} = require("../helpers/utils");
const authSchema = require("../models/authSchema");

const registration = async (req, res)=>{
    const { fullName, email, password } = req.body

    try {
        if(!fullName) return res.status(400).send({ message: "FullName is required"});
        if(!email) return res.status(400).send({ message: "email is required"});
        if(!isValidateEmail(email)) return res.status(400).send({ message: "email is invalidate"});
        if(!password) return res.status(400).send({ message: "password is required"});
         if(!validatePassword(password))return res.status(400).send({ message: "password is invalidate"});
         
         const existingEmail = await authSchema.findOne(email);

         if(existingEmail) return res.status(400).send({ message: "This Email is already registered"});

         const user = authSchema({ fullName, email, password })

        res.send("registration successfully")
    } catch (error) {
        
    }
}


module.exports = { registration }