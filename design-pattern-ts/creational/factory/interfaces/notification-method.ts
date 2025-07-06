import { IEmailUser, ISMSUser, IWhatsappUser } from "./user.model";
import { ISendEmail, ISendSMS, ISendWhatsapp } from "./details.model";

export interface INotificationMethod {
  validateUser(user:IEmailUser | ISMSUser | IWhatsappUser): boolean;
  send(sender_details:ISendEmail | ISendSMS | ISendWhatsapp ): void;
}