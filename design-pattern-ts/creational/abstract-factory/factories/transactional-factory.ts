import { IEmailFactory, ISMSFactory } from "../interfaces/abstract-notification-factory";
import { INotificationMethodCreator } from "../../factory/interfaces/notification-method-creator";
import { EmailCreator } from "../../factory/creators/email-creator";
import { SMSCreator } from "../../factory/creators/sms-creator";

export class TransactionalFactory implements IEmailFactory, ISMSFactory {
    createSMSCreator(): INotificationMethodCreator {
        return new SMSCreator();
    }

    createEmailCreator(): INotificationMethodCreator {
        return new EmailCreator();
    }

} 