import { INotificationMethod } from "../interfaces/notification-method";
import { IWhatsappUser } from "../interfaces/user.model";
import { ISendWhatsapp } from "../interfaces/details.model";

export class WhatsappProduct implements INotificationMethod {
    validateUser(user: IWhatsappUser): boolean {
        if(user.phone_number.length > 0 && user.password.length > 0) {
            return true;
        }
        throw new Error("Invalid user");
    }

    send(sender_details: ISendWhatsapp): void {
        console.log("Sending WhatsApp to", sender_details.receiver_phone_number, "with message", sender_details.message);
    }
}