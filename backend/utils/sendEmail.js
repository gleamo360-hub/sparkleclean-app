const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // The NEW email address
            pass: process.env.EMAIL_PASS // The NEW App Password
        }
    });

    try {
        await transporter.sendMail({
            from: `"SparkleClean" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            html: options.message,
        });
        console.log("✅ Email sent successfully");
    } catch (error) {
        console.error("❌ EMAIL SENDING FAILED:", error);
        throw error;
    }
};

module.exports = sendEmail;