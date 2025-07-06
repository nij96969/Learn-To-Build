import { INotificationMethod } from "../interfaces/notification-method";
import { ISendEmail } from "../interfaces/details.model";
import { IEmailUser } from "../interfaces/user.model";

export class EmailProduct implements INotificationMethod {
  validateUser(user: IEmailUser): boolean {
    if(user.email.includes("@") && user.password.length > 0) {
      return true;
    }
    throw new Error("Invalid user");
  }

  send(sender_details: ISendEmail): void {
    console.log("Sending email to", sender_details.receiver_email);
  }
}

export default EmailProduct;