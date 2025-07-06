# Factory Pattern Implementation - Notification System

## Overview
We use the Factory Pattern when we want to **create objects without specifying the exact class of object that will be created**. This pattern is particularly useful when we need to delegate object creation to subclasses or when we want to provide a common interface for creating related objects.

## Implementation Summary

This implementation demonstrates the **Factory Method Pattern** through a notification system that can send emails, SMS, and WhatsApp messages. The pattern separates the creation logic from the business logic, making the system more flexible and extensible.

## Key Components

### 1. Product Interface (`INotificationMethod`)
Defines the contract that all notification products must implement:
```typescript
interface INotificationMethod {
  validateUser(user: IEmailUser | ISMSUser | IWhatsappUser): boolean;
  send(sender_details: ISendEmail | ISendSMS | ISendWhatsapp): void;
}
```

### 2. Concrete Products
- **EmailProduct**: Handles email notifications with email validation
- **SMSProduct**: Handles SMS notifications with phone number validation  
- **WhatsappProduct**: Handles WhatsApp notifications

### 3. Creator Interface (`INotificationMethodCreator`)
Defines the factory method contract:
```typescript
interface INotificationMethodCreator {
  createNotificationMethod(method: string): INotificationMethod;
  executeNotification(user: User, sender_details: Details): void;
}
```

### 4. Concrete Creators
- **EmailCreator**: Creates `EmailProduct` instances
- **SMSCreator**: Creates `SMSProduct` instances
- **WhatsappCreator**: Creates `WhatsappProduct` instances

## Benefits of This Implementation

### 1. **Loose Coupling**
The client code doesn't need to know the specific classes being instantiated. It works with interfaces (`INotificationMethod`, `INotificationMethodCreator`).

### 2. **Single Responsibility Principle**
Each creator is responsible for creating one type of notification method, and each product handles its specific notification logic.

### 3. **Open/Closed Principle**
You can add new notification methods (e.g., Slack, Discord) without modifying existing code:
```typescript
// Easy to extend
class SlackCreator implements INotificationMethodCreator {
  createNotificationMethod(): INotificationMethod {
    return new SlackProduct();
  }
}
```

### 4. **Encapsulation**
The creation logic is encapsulated within the creator classes, hiding the complexity of object instantiation.

## Usage Example

```typescript
function userNotificationFactory(): void {
  const email_creator = new EmailCreator();
  const sms_creator = new SMSCreator();
  const whatsapp_creator = new WhatsappCreator();

  // Each creator handles its specific notification type
  email_creator.executeNotification(email_user, email_details);
  sms_creator.executeNotification(sms_user, sms_details);
  whatsapp_creator.executeNotification(whatsapp_user, whatsapp_details);
}
```

## When to Use Factory Pattern

✅ **Use when:**
- You need to create objects without specifying their exact classes
- You want to delegate object creation to subclasses
- You need to provide a common interface for creating related objects
- You want to make your code more maintainable and extensible
- You need to encapsulate complex object creation logic

❌ **Avoid when:**
- You only have one type of object to create
- The creation logic is simple and unlikely to change
- You're over-engineering a simple solution

Your implementation follows this structure perfectly, providing a clean, maintainable, and extensible notification system that can easily accommodate new notification methods in the future.

## Type Safety
The implementation leverages TypeScript's type system effectively:
- Strong typing for user models (`IEmailUser`, `ISMSUser`, `IWhatsappUser`)
- Typed notification details (`ISendEmail`, `ISendSMS`, `ISendWhatsapp`)
- Interface-based design ensuring contract compliance

This ensures compile-time safety and better developer experience with IntelliSense support. 