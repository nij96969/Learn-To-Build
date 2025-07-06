import { INotificationMethodCreator } from "../interfaces/notification-method-creator";
import { WhatsappProduct } from "../products/whatsapp-product";
import { INotificationMethod } from "../interfaces/notification-method";
import { ISendWhatsapp } from "../interfaces/details.model";
import { IWhatsappUser } from "../interfaces/user.model";

export class WhatsappCreator implements INotificationMethodCreator {
    createNotificationMethod(): INotificationMethod {
        return new WhatsappProduct();
    }

    executeNotification(user: IWhatsappUser, sender_details: ISendWhatsapp): void {
        const whatsapp_notification_method = this.createNotificationMethod();

        if (whatsapp_notification_method.validateUser(user)) {
            whatsapp_notification_method.send(sender_details);
        } else {
            console.log("Invalid user");
        }
    }
}