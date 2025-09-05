# Memento Pattern

## Overview

The **Memento Pattern** is a behavioral design pattern that provides the ability to restore an object to its previous state without revealing the details of its implementation. It's particularly useful for implementing undo functionality in applications.

## Intent

- Capture and externalize an object's internal state so that the object can be restored to this state later
- Preserve encapsulation boundaries while providing rollback capabilities
- Implement undo/redo functionality without violating the principle of information hiding

## Structure

The Memento pattern consists of three main components:

1. **Memento** (`EditorMemento`): Stores the internal state of the Originator object
2. **Originator** (`TextEditor`): Creates mementos containing snapshots of its current state and uses them to restore its state
3. **Caretaker** (`EditorHistory`): Manages mementos without examining their contents, responsible for storing and providing mementos

## Implementation

### Key Components

#### 1. Memento Interface (`IMemento`)
```typescript
interface IMemento {
    getState(): string;
    getTimestamp(): Date;
}
```

#### 2. Originator Interface (`IOriginator`)
```typescript
interface IOriginator {
    save(): IMemento;
    restore(memento: IMemento): void;
    show(): void;
}
```

#### 3. Caretaker Interface (`ICaretaker`)
```typescript
interface ICaretaker {
    backup(originator: IOriginator): void;
    undo(originator: IOriginator): void;
    redo(originator: IOriginator): void;
    getUndoCount(): number;
    getRedoCount(): number;
}
```

## Example Usage

```typescript
import { TextEditor } from './originator';
import { EditorHistory } from './caretaker';

// Create editor and history manager
const editor = new TextEditor();
const history = new EditorHistory();

// Write some text and create backup
editor.write("Hello ");
history.backup(editor);

editor.write("World");
history.backup(editor);

editor.show(); // Current Text: Hello World

// Undo operations
history.undo(editor);
editor.show(); // Current Text: Hello 

// Redo operations
history.redo(editor);
editor.show(); // Current Text: Hello World
```

## Features

### Core Functionality
- ✅ State snapshots creation and restoration
- ✅ Undo/Redo operations
- ✅ Immutable mementos
- ✅ Encapsulation preservation

### Advanced Features
- ✅ History management (undo/redo stacks)
- ✅ Timestamp tracking for mementos
- ✅ History summary and statistics
- ✅ Clear history functionality
- ✅ Comprehensive error handling

### Error Handling
- ✅ Input validation for all operations
- ✅ Null/undefined checks
- ✅ Graceful error recovery
- ✅ Contextual error messages using `handleError()`

## Benefits

1. **Encapsulation**: The originator's internal state is not exposed to the caretaker
2. **Simplicity**: The caretaker doesn't need to know about the complex internal structure of the originator
3. **Flexibility**: Multiple snapshots can be maintained for complex undo/redo scenarios
4. **Memory Management**: Old mementos can be discarded when no longer needed

## Drawbacks

1. **Memory Usage**: Storing multiple states can consume significant memory
2. **Performance**: Creating mementos frequently can impact performance
3. **Complexity**: Can become complex when dealing with large object graphs

## Use Cases

- **Text Editors**: Undo/redo functionality for document editing
- **Games**: Save/load game states, checkpoints
- **Configuration Management**: Rollback to previous configurations
- **Database Transactions**: Transaction rollback mechanisms
- **Form Handling**: Restore form states after navigation

## Running the Example

```bash
# Navigate to the memento directory
cd design-pattern-ts/behavioural/memento

# Run the example
npx ts-node memento-main.ts
```

## Best Practices

1. **Immutability**: Always make mementos immutable to prevent external modifications
2. **Memory Management**: Implement limits on the number of stored mementos
3. **Serialization**: Consider serialization for persistent storage of mementos
4. **Error Handling**: Always validate mementos before restoration
5. **Performance**: Use lazy initialization for expensive state operations

## Related Patterns

- **Command Pattern**: Often used together with Memento for implementing undo operations
- **Iterator Pattern**: Can be used to traverse through a sequence of mementos
- **Prototype Pattern**: Similar concept of creating copies, but serves different purposes

## Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Caretaker     │    │   Originator    │    │    Memento      │
│ (EditorHistory) │    │ (TextEditor)    │    │ (EditorMemento) │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ - undoStack     │    │ - text: string  │    │ - state: string │
│ - redoStack     │    │                 │    │ - timestamp     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ + backup()      │───▶│ + save()        │───▶│ + getState()    │
│ + undo()        │    │ + restore()     │    │ + getTimestamp()│
│ + redo()        │    │ + write()       │    │                 │
└─────────────────┘    │ + show()        │    └─────────────────┘
                       └─────────────────┘
```

## Notes

- The pattern ensures that the caretaker never accesses or modifies the memento's state directly
- The originator is responsible for creating and interpreting mementos
- This implementation includes enhanced error handling and additional utility methods for better usability
