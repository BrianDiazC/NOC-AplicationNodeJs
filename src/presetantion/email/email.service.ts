import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugins';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMAilOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[]
}
interface Attachement {
    fileName: string;
    path: string;
}
export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });
    constructor() { }
    async sendEmail(options: SendMAilOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });
            // console.log(sentInformation)
            return true;
        } catch (error) {
            return false
        }
    }
    
    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem ipsumEu tempor occaecat sint do incididunt labore officia reprehenderit id ad cupidatat fugiat Lorem. </p>
        <p>Ver logs adjuntos</p> `;

        const attachments: Attachement[] = [
            { fileName: 'logs-all.log', path: './logs/logs-all.log' },
            { fileName: 'logs-all.log', path: './logs/logs-medium.log' },
            { fileName: 'logs-all.log', path: './logs/logs-high.log' },
        ]

        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }
}