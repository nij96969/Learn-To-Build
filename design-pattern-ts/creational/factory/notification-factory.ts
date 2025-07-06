import { EmailCreator } from "./creators/email-creator";
import { SMSCreator } from "./creators/sms-creator";
import { WhatsappCreator } from "./creators/whatsapp-creator";
import { IEmailUser, ISMSUser, IWhatsappUser } from "./interfaces/user.model";
import { ISendEmail, ISendSMS, ISendWhatsapp } from "./interfaces/details.model";

const email_user: IEmailUser = {
    email: 'nij.akbari@ei.study',
    password: '123456'
};

const sms_user: ISMSUser = {
    phone_number: '09123456789',
    password: '123456'
};

const whatsapp_user: IWhatsappUser = {
    phone_number: '09123456789',
    password: '123456'
};

function userNotificationFactory(): void {
    const email_creator = new EmailCreator();
    const sms_creator = new SMSCreator();
    const whatsapp_creator = new WhatsappCreator();

    try {
        email_creator.executeNotification(email_user, {
            sender_email: 'nij.akbari@ei.study',
            receiver_email: 'nij.akbari@ei.study',
            subject: 'Test Email',
            body: 'Hello, this is a test email'
        });

        sms_creator.executeNotification(sms_user, {
            sender_phone_number: '09123456',
            receiver_phone_number: '09123456',
            message: 'Hello, this is a test SMS'
        });

        whatsapp_creator.executeNotification(whatsapp_user, {
            sender_phone_number: '09123456',
            receiver_phone_number: '09123456',
            message: 'Hello, this is a test WhatsApp'
        });


        


    }
    catch(error) {
        console.log(error);
    }
    
}

// Execute the factory function
userNotificationFactory();