import { IMemento } from '../interfaces/memento';
import { handleError } from '../../../utils/handleError';

/**
 * EditorMemento class that stores an immutable snapshot of the text editor state.
 * This class implements the Memento pattern by encapsulating the state
 * and providing read-only access to it.
 */
export class EditorMemento implements IMemento {
    private readonly _state: string;
    private readonly _timestamp: Date;

    /**
     * Creates a new memento with the given state
     * @param state The state to store in the memento
     */
    constructor(state: string) {
        try {
            if (typeof state !== 'string') {
                throw new Error('State must be a string');
            }
            
            this._state = state; // Immutable snapshot
            this._timestamp = new Date();
        } catch (error) {
            throw handleError(error, 'EditorMemento constructor');
        }
    }

    /**
     * Gets the state stored in the memento
     * @returns The immutable state data
     */
    getState(): string {
        try {
            return this._state;
        } catch (error) {
            throw handleError(error, 'EditorMemento.getState');
        }
    }

    /**
     * Gets the timestamp when the memento was created
     * @returns The creation timestamp
     */
    getTimestamp(): Date {
        try {
            return new Date(this._timestamp.getTime()); // Return a copy to maintain immutability
        } catch (error) {
            throw handleError(error, 'EditorMemento.getTimestamp');
        }
    }
}
