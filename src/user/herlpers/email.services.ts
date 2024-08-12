import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
    export class EmailService {
    private readonly brevoApiUrl = process.env.BREVO_API_URL
    private readonly apiKey = process.env.API_KEY

    async sendEmail(
        to: string | string[],
        subject: string,
        htmlContent: string,
        fromEmail: string = process.env.EMAIL_USER,
        fromName: string = 'JMalucelli Travelers Seguros'
    ): Promise<void> {
        try {

        const toRecipients = Array.isArray(to) 
            ? to.map(email => ({ email })) 
            : [{ email: to }];

        const data = {
            sender: { name: fromName, email: fromEmail },
            to: toRecipients,
            subject,
            htmlContent,
        };

        await axios.post(this.brevoApiUrl, data, {
            headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json',
            },
        });

        console.log(`Correo enviado a ${Array.isArray(to) ? to.join(', ') : to}`);
        } catch (error) {
        console.error(`Error enviando correo a ${Array.isArray(to) ? to.join(', ') : to}:`, error.response?.data || error.message);
        }
    }
}
