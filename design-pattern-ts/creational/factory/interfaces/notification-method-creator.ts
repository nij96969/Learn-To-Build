import { ISendEmail, ISendSMS, ISendWhatsapp } from "./details.model";
import { INotificationMethod } from "./notification-method";
import { IEmailUser, ISMSUser, IWhatsappUser } from "./user.model";

export interface INotificationMethodCreator {
  createNotificationMethod(method: string): INotificationMethod;
  executeNotification(user: IEmailUser | ISMSUser | IWhatsappUser, sender_details:ISendEmail | ISendSMS | ISendWhatsapp ): void;
}