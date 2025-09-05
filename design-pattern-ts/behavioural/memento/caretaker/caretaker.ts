import { ICaretaker } from '../interfaces/caretaker';
import { IOriginator } from '../interfaces/originator';
import { IMemento } from '../interfaces/memento';
import { handleError } from '../../../utils/handleError';

/**
 * EditorHistory class that implements the Caretaker pattern.
 * It manages the history of mementos and provides undo/redo functionality
 * without accessing the memento contents directly.
 */
export class EditorHistory implements ICaretaker {
    private _undoStack: IMemento[];
    private _redoStack: IMemento[];

    /**
     * Creates a new EditorHistory instance
     */
    constructor() {
        try {
            this._undoStack = [];
            this._redoStack = [];
        } catch (error) {
            throw handleError(error, 'EditorHistory constructor');
        }
    }

    /**
     * Creates a backup of the originator's current state
     * @param originator The originator to backup
     */
    backup(originator: IOriginator): void {
        try {
            if (!originator) {
                throw new Error('Originator cannot be null or undefined');
            }

            const memento = originator.save();
            this._undoStack.push(memento);
            this._redoStack = []; // Clear redo stack on new action
            
        } catch (error) {
            throw handleError(error, 'EditorHistory.backup')
        }
    }

    /**
     * Undoes the last operation
     * @param originator The originator to restore
     */
    undo(originator: IOriginator): void {
        try {
            if (!originator) {
                throw new Error('Originator cannot be null or undefined');
            }

            if (this._undoStack.length === 0) {
                console.log("Nothing to undo");
                return;
            }

            const memento = this._undoStack.pop();
            if (!memento) {
                throw new Error('Failed to retrieve memento from undo stack');
            }

            // Store current state for redo before restoring
            this._redoStack.push(originator.save());
            originator.restore(memento);

        } catch (error) {
            throw handleError(error, 'EditorHistory.undo');
        }
    }

    /**
     * Redoes the previously undone operation
     * @param originator The originator to restore
     */
    redo(originator: IOriginator): void {
        try {
            if (!originator) {
                throw new Error('Originator cannot be null or undefined');
            }

            if (this._redoStack.length === 0) {
                console.log("Nothing to redo");
                return;
            }

            const memento = this._redoStack.pop();
            if (!memento) {
                throw new Error('Failed to retrieve memento from redo stack');
            }

            // Store current state for undo before restoring
            this._undoStack.push(originator.save());
            originator.restore(memento);
            
        } catch (error) {
            throw handleError(error, 'EditorHistory.redo');
        }
    }
}
