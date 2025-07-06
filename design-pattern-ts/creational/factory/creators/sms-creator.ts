import { INotificationMethodCreator } from "../interfaces/notification-method-creator";
import { SMSProduct } from "../products/sms-product";
import { INotificationMethod } from "../interfaces/notification-method";
import { ISendSMS } from "../interfaces/details.model";
import { ISMSUser } from "../interfaces/user.model";

export class SMSCreator implements INotificationMethodCreator {
    createNotificationMethod(): INotificationMethod {
        return new SMSProduct();
    }

    executeNotification(user: ISMSUser, sender_details: ISendSMS): void {
        const sms_notification_method = this.createNotificationMethod();
        if (sms_notification_method.validateUser(user)) {
            sms_notification_method.send(sender_details);
        } else {
            console.log("Invalid user");
        }
    }
}