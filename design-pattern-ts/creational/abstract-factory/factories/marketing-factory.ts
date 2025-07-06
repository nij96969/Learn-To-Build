import { IWhatsAppFactory } from "../interfaces/abstract-notification-factory";
import { INotificationMethodCreator } from "../../factory/interfaces/notification-method-creator";
import { WhatsappCreator } from "../../factory/creators/whatsapp-creator";

export class MarketingFactory implements IWhatsAppFactory {

    createWhatsAppCreator(): INotificationMethodCreator {
        return new WhatsappCreator();
    }
} 