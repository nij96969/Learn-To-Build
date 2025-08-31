import { ICommand } from '../interfaces/command';
import { PDFService } from '../receivers/pdf-service';
import { handleError } from '../../../utils/handleError';

// ERW Command
class ERWPDFCommand implements ICommand {
    constructor(private payload: any, private receiver: PDFService) {}
    
    async execute() {
        try {
            await this.receiver.generateERW(this.payload);
        } catch (err) {
            throw handleError(err, 'ERW PDF Command');
        }
    }
}

export { ERWPDFCommand };
