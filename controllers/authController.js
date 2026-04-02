const { isValidateEmail } = require("../helpers/utils")

const registration = async (req, res)=>{
    const { fullName, email, password } = req.body

    try {
        if(!fullName) return res.status(400).send({ message: "FullName is required"})
        if(!email) return res.status(400).send({ message: "email is required"})
        if(!isValidateEmail(email)) return res.status(400).send({ message: "email is invalidate"})
        if(!password) return res.status(400).send({ message: "password is required"})

        res.send("registration successfully")
    } catch (error) {
        
    }
}


module.exports = { registration }