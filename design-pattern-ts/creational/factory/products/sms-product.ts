import { INotificationMethod } from "../interfaces/notification-method";
import { ISMSUser } from "../interfaces/user.model";
import { ISendSMS } from "../interfaces/details.model";

export class SMSProduct implements INotificationMethod {
    validateUser(user: ISMSUser): boolean {
        if( user.phone_number.length > 0 && user.password.length > 0) {
            return true;
        }
        throw new Error("Invalid user");
    }

    send(sender_details: ISendSMS): void {
        console.log("Sending SMS to", sender_details.receiver_phone_number, "with message", sender_details.message);
    }
}