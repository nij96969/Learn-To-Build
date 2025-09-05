import { IOriginator } from './originator';

export interface ICaretaker {
    backup(originator: IOriginator): void;
    
    undo(originator: IOriginator): void;
    
    redo(originator: IOriginator): void;
}
