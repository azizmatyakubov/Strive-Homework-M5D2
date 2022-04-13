import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async (recipient, subject, message) => {
    const msg = {
        to: recipient,
        from: process.env.SENDER,
        subject: subject,
        text: message,
        html: `<strong>${message}</strong>`

    }

    await sgMail.send(msg)
}