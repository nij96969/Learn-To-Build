import { ICommand } from './interfaces/command';
import { handleError } from '../../utils/handleError';

class JobQueue {
    private job_queue: ICommand[] = [];

    enqueue(command: ICommand) {
        try {
            this.job_queue.push(command);
            console.log(`📥 Job added to queue. Queue length: ${this.job_queue.length}`);
        } catch (err) {
            throw handleError(err, 'Job Queue - Enqueue');
        }
    }

    async process() {
        try {
            while (this.job_queue.length > 0) {
                const job = this.job_queue.shift();
                if (job) {
                    try {
                        await job.execute();
                        console.log("✅ Job executed successfully");
                    } catch (err) {
                        const handled_error = handleError(err, 'Job Execution');
                        console.error("❌ Job failed:", handled_error.message);
                        // Optionally requeue or log
                    }
                }
            }
        } catch (err) {
            throw handleError(err, 'Job Queue - Process');
        }
    }
}

export { JobQueue };
