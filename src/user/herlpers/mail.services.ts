import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@microsoft/microsoft-graph-client';
import { ConfidentialClientApplication } from '@azure/msal-node';
import 'isomorphic-fetch';

@Injectable()
export class MailerService {
    private client: Client;
    private readonly logger = new Logger(MailerService.name);

    constructor(private readonly configService: ConfigService) {
        const tenantId = this.configService.get<string>('TENANT_ID');
        const clientId = this.configService.get<string>('CLIENT_ID');
        const clientSecret = this.configService.get<string>('CLIENT_SECRET');

        const config = {
            auth: {
                clientId: clientId,
                clientSecret: clientSecret,
                authority: `https://login.microsoftonline.com/${tenantId}`,
            },
        };

        const cca = new ConfidentialClientApplication(config);

        this.client = Client.initWithMiddleware({
            authProvider: {
                getAccessToken: async () => {
                    const tokenResponse = await cca.acquireTokenByClientCredential({
                        scopes: ['https://graph.microsoft.com/.default'],
                    });
                    console.log(tokenResponse);
                    return tokenResponse.accessToken;
                },
            },
        });
    }

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        try {
            console.log(this.client)
                // Reemplaza 'user@example.com' con la dirección del remitente o ID de usuario correcto
                const sender = 'mikecardonar@gmail.com';

                await this.client.api(`/users/${sender}/sendMail`).post({
                    message: {
                        subject: subject,
                        body: {
                            contentType: 'Text',
                            content: text,
                        },
                        toRecipients: [
                            {
                                emailAddress: {
                                    address: to,
                                },
                            },
                        ],
                    },
                });
            this.logger.debug('Email sent successfully');
        } catch (error) {
            this.logger.error(`Error sending email: ${error.message}`);
            throw error;
        }
    }
}
