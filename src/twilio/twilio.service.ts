import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
    constructor(private configService: ConfigService) {}
    async sendSMS(phoneNumber: string, message: string) {
        try {
            const twilioAuthToken = this.configService.get('twilio.twilioAuthToken');
            const twilioPhoneNumber = this.configService.get('twilio.twilioPhoneNumber');
            const twilioAccountSID = this.configService.get('twilio.twilioAccountSID');
            const client = new Twilio(twilioAccountSID, twilioAuthToken);
            const smsResponse = await client.messages.create({
                from: twilioPhoneNumber,
                to: phoneNumber,
                body: message,
            });
            console.log(smsResponse.sid);
        } catch (error) {
            error.statusCode = 400;
            throw error;
        }
    }
}
