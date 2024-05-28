import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

//NOTE ONLY USE WHEN SENDING TO EMAIL ADDRESSES WE OWN; OR WE WILL SPAM STRANGERS
 export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL as string,
        subject: 'Welcome to Our Service',
        text: `Hello ${name}, welcome!.`,
        html: `<strong>We are glad to have you ${name}</strong>`,
    };

    await sgMail.send(msg);
}; 

export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL as string,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link below to reset your password: \n\n ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        html: `You requested a password reset. Click the link below to reset your password: <br><br> <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>`,
    };

    await sgMail.send(msg); 
}; 