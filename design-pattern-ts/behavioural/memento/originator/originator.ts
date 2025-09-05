import { IOriginator } from '../interfaces/originator';
import { IMemento } from '../interfaces/memento';
import { EditorMemento } from '../memento/memento';
import { handleError } from '../../../utils/handleError';

/**
 * TextEditor class that implements the Originator pattern.
 * It can create snapshots of its state and restore from them.
 */
export class TextEditor implements IOriginator {
    private _text: string;

    /**
     * Creates a new TextEditor instance
     */
    constructor() {
        try {
            this._text = "";
        } catch (error) {
            throw handleError(error, 'TextEditor constructor');
        }
    }

    /**
     * Writes text to the editor
     * @param text The text to append to the current content
     */
    write(text: string): void {
        try {
            if (typeof text !== 'string') {
                throw new Error('Text must be a string');
            }
            
            this._text += text;
        } catch (error) {
            throw handleError(error, 'TextEditor.write');
        }
    }

    /**
     * Gets the current text content
     * @returns The current text
     */
    getText(): string {
        try {
            return this._text;
        } catch (error) {
            throw handleError(error, 'TextEditor.getText');
        }
    }

    /**
     * Displays the current text content
     */
    show(): void {
        try {
            console.log("Current Text:", this._text);
        } catch (error) {
            console.error(handleError(error, 'TextEditor.show'));
        }
    }

    /**
     * Creates a snapshot of the current state
     * @returns A memento containing the current state
     */
    save(): IMemento {
        try {
            return new EditorMemento(this._text);
        } catch (error) {
            throw handleError(error, 'TextEditor.save');
        }
    }

    /**
     * Restores the state from a memento
     * @param memento The memento to restore from
     */
    restore(memento: IMemento): void {
        try {
            if (!memento) {
                throw new Error('Memento cannot be null or undefined');
            }
            
            this._text = memento.getState();
        } catch (error) {
            throw handleError(error, 'TextEditor.restore');
        }
    }

    /**
     * Clears all text content
     */
    clear(): void {
        try {
            this._text = "";
        } catch (error) {
            throw handleError(error, 'TextEditor.clear');
        }
    }
}
