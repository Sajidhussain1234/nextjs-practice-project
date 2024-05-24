import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      const user = await User.findOneAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 60 * 24,
      });
    } else if (emailType === "RESET") {
      const user = await User.findOneAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 1000 * 60 * 60 * 24,
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"> here </a>to ${
        emailType === "VERIFY"
      } ?"verify your email :  "reset your password </p>`, // html body
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail responsee", mailResponse);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
    console.log("Error in sending mail", error.message);
  }
};
