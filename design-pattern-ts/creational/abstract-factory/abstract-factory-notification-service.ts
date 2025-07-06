import { IEmailUser, ISMSUser, IWhatsappUser } from "../factory/interfaces/user.model";
import { ISendEmail, ISendSMS, ISendWhatsapp } from "../factory/interfaces/details.model";
import { TransactionalFactory } from "./factories/transactional-factory";
import { MarketingFactory } from "./factories/marketing-factory";
// Sample users
const emailUser: IEmailUser = {
    email: 'john.doe@company.com',
    password: 'password123'
};

const smsUser: ISMSUser = {
    phone_number: '+1234567890',
    password: 'password123'
};

const whatsappUser: IWhatsappUser = {
    phone_number: '+1234567890',
    password: 'password123'
};

// Sample message details
const emailDetails: ISendEmail = {
    sender_email: 'system@company.com',
    receiver_email: 'john.doe@company.com',
    subject: 'Transaction Alert',
    body: 'Your transaction has been processed successfully.'
};

const smsDetails: ISendSMS = {
    sender_phone_number: '+1234567890',
    receiver_phone_number: '+1234567890',
    message: 'Your transaction has been processed successfully.'
};

const whatsappDetails: ISendWhatsapp = {
    sender_phone_number: '+1234567890',
    receiver_phone_number: '+1234567890',
    message: 'Check out our new marketing campaign!'
};

function demonstrateAbstractFactory(): void {
    try {
        console.log("=== Abstract Factory Pattern Demo ===\n");

        // 1. Demonstrate Transactional Factory (SMS + Email)
        console.log("1. Using Transactional Factory (SMS + Email services):");
        console.log("---------------------------------------------------");
        
        const transactionalFactory = new TransactionalFactory();
        
        // Create SMS creator and send SMS
        const smsCreator = transactionalFactory.createSMSCreator();
        console.log("Sending SMS via Transactional Factory:");
        smsCreator.executeNotification(smsUser, smsDetails);
    
        // Create Email creator and send Email
        const emailCreator = transactionalFactory.createEmailCreator();
        console.log("Sending Email via Transactional Factory:");
        emailCreator.executeNotification(emailUser, emailDetails);
    
        // Note: WhatsApp is not available in transactional factory
        console.log("Note: WhatsApp service is not available in Transactional Factory");
    
        console.log("\n");
    
        // 2. Demonstrate Marketing Factory (WhatsApp only)
        console.log("2. Using Marketing Factory (WhatsApp service only):");
        console.log("--------------------------------------------------");
        
        const marketingFactory = new MarketingFactory();
        const whatsappCreator = marketingFactory.createWhatsAppCreator();
    
        // Send WhatsApp using marketing factory
        console.log("Sending WhatsApp via Marketing Factory:");
        whatsappCreator.executeNotification(whatsappUser, whatsappDetails);
    
        // Note: SMS and Email are not available in marketing factory
        console.log("Note: SMS and Email services are not available in Marketing Factory");
    
        console.log("\n=== Demo Complete ===");        
    }
    catch(error) {
        console.log("Error occurred:", error);
    }
}

// Run the demonstration
demonstrateAbstractFactory(); 