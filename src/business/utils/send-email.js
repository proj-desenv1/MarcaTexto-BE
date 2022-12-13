const nodeMailer = require("nodemailer");

module.exports = async (subject, message, receiver) => {
    const transporter = await nodeMailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ADDRESS, 
            pass: process.env.EMAIL_PASSWORD, 
        },
    });
    const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: receiver, 
        subject: subject,
        html: message,
    });
}