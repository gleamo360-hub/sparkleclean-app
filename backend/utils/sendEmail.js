// backend/utils/sendEmail.js
// Example using Resend (much more reliable than Nodemailer)
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async(options) => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev', // Use your verified domain here later
            to: options.email,
            subject: options.subject,
            html: options.message
        });
    } catch (error) {
        console.error("Resend Error:", error);
    }
};

module.exports = sendEmail;