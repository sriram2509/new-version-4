import nodemailer from "nodemailer";

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST, //optional
        port: process.env.SMPT_PORT, //optional
        service: process.env.SMPT_SERVICE, 
        auth: {
            user: process.env.SMPT_MAIL, //SMPT is Simple Mail Transfer Protocol
            pass: process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);
}

export default sendEmail;