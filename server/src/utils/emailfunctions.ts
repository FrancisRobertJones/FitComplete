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

//TODO FINISH PASSWORD RESET
export const sendPasswordResetEmail = async (email: string, resetCode: string): Promise<void> => {
    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL as string,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link below to reset your password: \n\n ${process.env.FRONTEND_URL}/reset-password?token=${resetCode}`,
        html: `You requested a password reset. Click the link below to reset your password: <br><br> <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetCode}">Reset Password</a>`,
    };

    await sgMail.send(msg); 
}; 

export const sendContentCreatorRequest = async (email: string, name: string): Promise<boolean> => {
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    const toEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!fromEmail) {
        console.error('SENDGRID_FROM_EMAIL environment variable is not set.');
        return false;
      }
    const msg = {
        to: toEmail,
        from: fromEmail,
        subject: 'Content creator request',
        text: `${email} would like to become a content creator on FitComplete`,
        html: `<strong>Update ${name}s account settings and reply ASAP, email: ${email}</strong>`,
    };

    try {
        await sgMail.send(msg);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}; 