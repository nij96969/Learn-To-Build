import { handleError } from '../../../utils/handleError';

class PDFService {
    async generateERW(data: any) {
        try {
            console.log("Generating ERW PDF for", data);
            // actual PDF logic here
            await this.simulateProcessing(2000);
            console.log("ERW PDF generated successfully");
        } catch (err) {
            throw handleError(err, 'ERW PDF Generation');
        }
    }
    
    async generateSMB(data: any) {
        try {
            console.log("Generating SMB PDF for", data);
            // actual PDF logic here
            await this.simulateProcessing(3000);
            console.log("SMB PDF generated successfully");
        } catch (err) {
            throw handleError(err, 'SMB PDF Generation');
        }
    }
    
    async generateCertificate(data: any) {
        try {
            console.log("Generating Certificate PDF for", data);
            // actual PDF logic here
            await this.simulateProcessing(1500);
            console.log("Certificate PDF generated successfully");
        } catch (err) {
            throw handleError(err, 'Certificate PDF Generation');
        }
    }

    private async simulateProcessing(duration_ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, duration_ms);
        });
    }
}

export { PDFService };
