# Composite Design Pattern

## Overview

The **Composite Pattern** is a structural design pattern that allows you to compose objects into tree structures and then work with those structures as if they were individual objects. This pattern enables clients to treat individual objects and compositions of objects uniformly.

## Intent

- Compose objects into tree structures to represent part-whole hierarchies
- Let clients treat individual objects and compositions of objects uniformly
- Simplify client code by eliminating the need to distinguish between leaf and composite objects

## When to Use

The Composite pattern is useful when:
- You want to represent a hierarchy of objects (tree structures)
- You want clients to be able to ignore the difference between compositions of objects and individual objects
- You have a structure that can be represented as a tree (e.g., file systems, GUI components, organizational charts)

## Real-World Examples

- **File System**: Files and folders where folders can contain both files and other folders
- **GUI Components**: UI elements where containers can hold other containers and individual components
- **Organization Charts**: Employees and departments where departments contain other departments and employees

## Implementation Approaches

There are two main ways to design the Composite pattern:

### 1. Design with Uniformity (Safety traded for transparency)

```typescript
interface IStorage {
    name: string;
    display(): void;
    getChild(index: number): IStorage | null;
    add(child: IStorage): void;
    remove(child: IStorage): void;
}
```

**Pros:**
- All objects have the same interface
- Client code is simplified
- Easy to add new types of components

**Cons:**
- Leaf objects must implement methods they don't use
- Less type-safe (leaf objects might throw exceptions for composite methods)

### 2. Design with Type Safety (Transparency traded for safety)

```typescript
interface IStorage {
    name: string;
    display(): void;
}
```

**Pros:**
- Type-safe - leaf objects don't have methods they shouldn't have
- Clear separation of concerns
- Compile-time error detection

**Cons:**
- Client code may need to check object types
- Less uniform interface

## Our Implementation

This implementation uses the **Type Safety approach** with the following structure:

### Components

1. **IStorage Interface** (`interfaces/storage-component.ts`)
   - Base interface for all storage components
   - Defines common operations: `name` property and `display()` method

2. **Folder Class** (`file-system-composite.ts`)
   - Composite component that can contain other storage items
   - Implements tree management operations: `add()`, `remove()`, `getChild()`
   - Recursively displays all contained items

3. **File Class** (`file-system-composite.ts`)
   - Leaf component representing individual files
   - Contains file content and implements display functionality

### Class Diagram

```
    IStorage
    ┌─────────────────-┐
    │ + name: string   │
    │ + display(): void│
    └─────────────────-┘
           ▲
           │
    ┌──────┴──────┐
    │             │
┌───▼────-┐   ┌───▼────────────────────┐
│  File   │   │       Folder           │
├────────-┤   ├────────────────────────┤
│+ text   │   │- children: IStorage[]  │
├────────-┤   ├────────────────────────┤
│display()│   │+ add(child): void      │
└────────-┘   │+ remove(child): void   │
              │+ getChild(index): void │
              │+ display(): void       │
              └────────────────────────┘
```

## Usage Example

```typescript
// Create folders and files
let rootFolder = new Folder("Root");
let documentsFolder = new Folder("Documents");
let picturesFolder = new Folder("Pictures");

let readme = new File("README.md", "Project documentation");
let photo = new File("vacation.jpg", "Family vacation photo");

// Build the tree structure
rootFolder.add(documentsFolder);
rootFolder.add(picturesFolder);
documentsFolder.add(readme);
picturesFolder.add(photo);

// Display the entire structure
rootFolder.display();
// Output:
// Folder: Root
// Folder: Documents
// File: README.md - Project documentation
// Folder: Pictures
// File: vacation.jpg - Family vacation photo
```

## Key Benefits

1. **Uniformity**: Clients can treat individual objects and compositions uniformly
2. **Simplicity**: Easy to add new types of components
3. **Flexibility**: Tree structures can be composed dynamically
4. **Recursive Operations**: Operations automatically apply to the entire tree structure

## Participants

- **Component (IStorage)**: Declares the interface for objects in the composition
- **Leaf (File)**: Represents leaf objects in the composition with no children
- **Composite (Folder)**: Defines behavior for components having children and stores child components
- **Client**: Manipulates objects in the composition through the Component interface

## Related Patterns

- **Decorator**: Often used together with Composite
- **Iterator**: Can be used to traverse Composite structures
- **Visitor**: Can be used to perform operations on Composite structures
