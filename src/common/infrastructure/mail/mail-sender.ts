import nodemailer from 'nodemailer';
import { mailConfig } from '../../../config/mail.config';

export class MailSender {
    private static transporter = nodemailer.createTransport({
        ...mailConfig
    })

    public static async send(to: string, subject: string, html: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: '"Employee 360" <no-reply@employee.com>',
                to,
                subject,
                html,
            });
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Failed to send email to ${to}:`, error);
        }
    }
}