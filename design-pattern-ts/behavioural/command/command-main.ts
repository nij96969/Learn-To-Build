import { PDFService } from './receivers/pdf-service';
import { JobQueue } from './JobQueue';
import { ERWPDFCommand } from './commands/erw-pdf-command';
import { SMBPDFCommand } from './commands/smb-pdf-command';
import { CertificatePDFCommand } from './commands/certificate-pdf-command';
import { handleError } from '../../utils/handleError';

// Example Usage
(async () => {
    try {
        console.log('Starting Job Scheduling System with Command Pattern');
        console.log('=' .repeat(60));
        
        const pdf_service = new PDFService();
        const job_queue = new JobQueue();

        console.log('\nSimulating API Calls - Creating PDF Generation Jobs');
        console.log('-'.repeat(50));

        // API Calls wrapped as Commands
        job_queue.enqueue(new ERWPDFCommand({ user_id: 1, exam: "Math" }, pdf_service));
        job_queue.enqueue(new SMBPDFCommand({ user_id: 2, report: "Sales Q1" }, pdf_service));
        job_queue.enqueue(new CertificatePDFCommand({ user_id: 3, course: "Node.js" }, pdf_service));

        // Add more jobs to demonstrate queuing
        job_queue.enqueue(new ERWPDFCommand({ user_id: 4, exam: "Science" }, pdf_service));
        job_queue.enqueue(new CertificatePDFCommand({ user_id: 5, course: "TypeScript" }, pdf_service));

        console.log('\nStarting Worker Processing');
        console.log('-'.repeat(30));

        // Worker processing
        await job_queue.process();

        console.log('\nAll jobs completed!');
        console.log('=' .repeat(60));

    } catch (err) {
        const handled_error = handleError(err, 'Command Pattern Demo');
        console.error(`❌ Demo failed: ${handled_error.message}`);
    }
})();
