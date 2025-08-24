import { IStorage } from "./interfaces/storage-component";

export class Folder implements IStorage {
    private children: IStorage[] = [];

    constructor(public name: string) {
        this.name = name;
    }

    add(child: IStorage): void {
        this.children.push(child);
    }

    remove(child: IStorage): void {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    getChild(index: number): IStorage | null {
        return this.children[index] || null;
    }

    display(): void {
        console.log(`Folder: ${this.name}`);
        this.children.forEach(child => {
            child.display();
        });
    }

    // Convenience methods (optional, for backward compatibility)
    addFile(file: IStorage): void {
        this.add(file);
    }

    addFolder(folder: IStorage): void {
        this.add(folder);
    }
}

export class File implements IStorage {
    name: string;
    text: string;
    
    constructor(name: string, text: string) {
        this.name = name;
        this.text = text;
    }

    display(): void {
        console.log(`File: ${this.name} - ${this.text}`);
    }
}