# Command Pattern - Job Scheduling System

## 🎯 Overview

This implementation demonstrates the **Command Pattern** in the context of a real-world **Job Scheduling System** for PDF generation. API calls are wrapped into **Command objects** and pushed into a queue, where a worker processes them asynchronously.

## 🏗️ Architecture

```
Client (API) → Command → Queue → Worker → Receiver (PDF Service)
```

## 📁 Files Structure

```
command/
├── interfaces/
│   └── command.ts               # ICommand interface
├── commands/
│   ├── erw-pdf-command.ts       # ERW PDF command
│   ├── smb-pdf-command.ts       # SMB PDF command  
│   └── certificate-pdf-command.ts # Certificate PDF command
├── receivers/
│   └── pdf-service.ts           # Receiver - actual PDF generation logic
├── JobQueue.ts                  # Queue mechanism with error handling
├── command-main.ts              # Example usage demonstration
└── README.md                    # This documentation
```

## 🔹 Components

### 1. **Client Request**
A client hits one of your APIs:
- `/generate-pdf/erw`
- `/generate-pdf/smb`
- `/generate-pdf/certificates`

### 2. **Command Object Creation**
Instead of executing immediately, you wrap the request in a **Command object**:

```ts
class GenerateERWPDFCommand implements ICommand {
    constructor(private payload: any, private receiver: PDFService) {}
    execute() {
        return this.receiver.generateERW(this.payload);
    }
}
```

### 3. **Queue the Command**
The command is pushed into a **queue system** (Redis, RabbitMQ, Kafka, SQS, or even a DB-backed queue).

### 4. **Scheduler / Worker**
A worker process constantly listens to the queue, pops the next Command, and executes it. This allows **retry, logging, failure handling, prioritization**.

### 5. **Execution (Receiver)**
The actual PDF generation logic resides in the **Receiver** (`PDFService`). Each Command delegates execution to the appropriate function.

## 🏃‍♂️ Running the Example

```bash
# From the project root
npm run command

# Or using ts-node directly
ts-node behavioural/command/command-main.ts
```

## 🔹 How This Scales in Industry

- Instead of in-memory `JobQueue`, use **BullMQ (Redis), RabbitMQ, Kafka, AWS SQS**
- Add **retry policies, priority queues, dead-letter queues**
- Use **multiple workers** (horizontal scaling)
- Commands provide **decoupling** → new PDF types just mean new Commands without changing the queue or worker logic

## ✅ Benefits

- **API Call** → **Command object** → **Queue** → **Worker executes** → **PDF Generated**
- If **ERW, SMB, Certificates** expand to 20+ types, you just add new Command classes
- Decoupled architecture enables easy testing and scaling
- Error handling with context using `handleError` function
- Snake_case variable naming as per coding standards

## 🌍 Production Environment

In real production systems, this pattern enables:
- Asynchronous processing
- Horizontal scaling  
- Fault tolerance
- Job prioritization
- Monitoring and alerting
- Easy extensibility

The Command Pattern provides the foundation for building robust, scalable job scheduling systems commonly used in enterprise applications.
