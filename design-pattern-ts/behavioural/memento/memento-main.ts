import { TextEditor } from './originator/originator';
import { EditorHistory } from './caretaker/caretaker';
import { handleError } from '../../utils/handleError';

function demonstrateMementoPattern(): void {
    try {

        // Create the text editor and history manager
        const editor = new TextEditor();
        const history = new EditorHistory();

        // Initial state
        editor.show(); // Should show empty text

        // Step 1: Write some text and create backu
        editor.write("Hello ");
        history.backup(editor);
        editor.show();

        // Step 2: Write more text and create another backup
        editor.write("World");
        history.backup(editor);
        editor.show();

        // Step 3: Write additional text and create backup
        editor.write("!");
        history.backup(editor);
        editor.show();

        // Step 4: Demonstrate undo functionality
        history.undo(editor);
        editor.show(); // Should show: "Hello World"

        history.undo(editor);
        editor.show(); // Should show: "Hello "

        // Step 5: Demonstrate redo functionality
        history.redo(editor);
        editor.show(); // Should show: "Hello World"

        history.redo(editor);
        editor.show(); // Should show: "Hello World!"

        // Step 6: Try to redo when nothing is available
        history.redo(editor); // Should show "Nothing to redo"

        // Step 7: Write new text (this clears redo stack)
        editor.write(" How are you?");
        history.backup(editor);
        editor.show();

        // Step 8: Try to redo after new operations
        history.redo(editor); // Should show "Nothing to redo"

        // Step 9: Final undo to demonstrate
        history.undo(editor);
        editor.show();

    } catch (error) {
        throw handleError(error, 'demonstrateMementoPattern');
    }
}

demonstrateMementoPattern();
