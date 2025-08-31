import { ICommand } from '../interfaces/command';
import { PDFService } from '../receivers/pdf-service';
import { handleError } from '../../../utils/handleError';

// Certificate Command
class CertificatePDFCommand implements ICommand {
    constructor(private payload: any, private receiver: PDFService) {}
    
    async execute() {
        try {
            await this.receiver.generateCertificate(this.payload);
        } catch (err) {
            throw handleError(err, 'Certificate PDF Command');
        }
    }
}

export { CertificatePDFCommand };
