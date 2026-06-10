// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `SparkleClean <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            html: options.message,
        });
        console.log("✅ Email sent successfully:", info.messageId);
    } catch (error) {
        // THIS WILL SHOW THE FULL TECHNICAL ERROR IN RENDER LOGS
        console.error("❌ FULL EMAIL ERROR:", JSON.stringify(error, null, 2));
        throw error;
    }
};

module.exports = sendEmail;