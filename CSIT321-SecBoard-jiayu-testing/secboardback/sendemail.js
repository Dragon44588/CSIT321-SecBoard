require("dotenv").config();
const nodemailer = require("nodemailer");//import nodemailer

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GOOGLE_EMAIL,
              pass: process.env.GOOGLE_PASSWORD
            }
          });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;