import { ISendEmail } from "../interfaces/details.model";
import { INotificationMethodCreator } from "../interfaces/notification-method-creator";
import { EmailProduct } from "../products/email-product";
import { INotificationMethod } from "../interfaces/notification-method";
import { IEmailUser } from "../interfaces/user.model";

export class EmailCreator implements INotificationMethodCreator {
  createNotificationMethod(): INotificationMethod {
    return new EmailProduct();
  }

  executeNotification(user: IEmailUser, sender_details:ISendEmail): void {
    const email_notification_method = this.createNotificationMethod();
    email_notification_method.send(sender_details);
  }
}

export default EmailCreator;