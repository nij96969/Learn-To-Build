export interface ISendEmail {
    sender_email: string;
    receiver_email: string;
    subject: string;
    body: string;
}

export interface ISendSMS {
    sender_phone_number: string;
    receiver_phone_number: string;
    message: string;
}

export interface ISendWhatsapp {
    sender_phone_number: string;
    receiver_phone_number: string;
    message: string;
}