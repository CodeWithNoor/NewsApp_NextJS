import nodemailer from 'nodemailer';
import { Userdb } from "@/lib/model/Userdb";
// import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // create a hased token
        const hashedToken = await (userId)

        if (emailType === "VERIFY") {
            await Userdb.findByIdAndUpdate(userId,
                { verifiedToken: hashedToken, verifiedTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await Userdb.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_NAME,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });


        const mailOptions = {
            from: 'fatima.kaleem@chaoscorporated.com',
            to: email,
            subject: emailType === "RESET" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemailforgotpassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}