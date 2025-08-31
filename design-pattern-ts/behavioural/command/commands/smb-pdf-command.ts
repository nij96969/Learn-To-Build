import { ICommand } from '../interfaces/command';
import { PDFService } from '../receivers/pdf-service';
import { handleError } from '../../../utils/handleError';

// SMB Command
class SMBPDFCommand implements ICommand {
    constructor(private payload: any, private receiver: PDFService) {}
    
    async execute() {
        try {
            await this.receiver.generateSMB(this.payload);
        } catch (err) {
            throw handleError(err, 'SMB PDF Command');
        }
    }
}

export { SMBPDFCommand };
