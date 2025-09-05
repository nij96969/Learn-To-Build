import { IMemento } from './memento';

export interface IOriginator {
    save(): IMemento;

    restore(memento: IMemento): void;
    
    show(): void;
}
