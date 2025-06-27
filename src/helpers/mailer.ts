import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any) =>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            })
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USERID!,
            pass: process.env.MAILTRAP_PASSWORD!
        }
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail" : "resetPassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your account" : "reset your password"} 
            or Copy paste the link in your browser. 
            <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail" : "resetPassword"}?token=${hashedToken}</p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}