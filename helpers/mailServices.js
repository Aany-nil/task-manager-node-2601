const nodemailer = require("nodemailer");


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "gamil",
  port: 587,
  secure: false,
  auth: {
    user: "nilporidreamgirl123@gmail.com",
    pass: "hzyc pfmv kqlv wnmc"
  },
});


const mailsending = async({ email, subject, otp }) => {
     try {
        await transporter.sendMail({
    from: '"Task Team" <team@taskmanager.com>', // sender address
    to: email,
    subject: subject,
    html: `<b>Hello world?</b>
    <b> OTP : ${otp} <b/>`,
  });
     } catch (error) {
      console.log("Error while sending mail, error");  
     }
  }

module.exports = { mailsending }