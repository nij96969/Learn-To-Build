import { INotificationMethodCreator } from "../../factory/interfaces/notification-method-creator";

export interface ISMSFactory {
    createSMSCreator(): INotificationMethodCreator;
}
  
export interface IEmailFactory {
    createEmailCreator(): INotificationMethodCreator;
}
  
export interface IWhatsAppFactory {
    createWhatsAppCreator(): INotificationMethodCreator;
}
  