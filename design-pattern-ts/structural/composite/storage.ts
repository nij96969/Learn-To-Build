import { IFolder, IFile } from "./interface/storage";

export class Folder implements IFolder {
    storage: (IFile | IFolder)[] = [];

    constructor(public name: string) {
        this.name = name;
    }

    addFile(file: IFile) {
        this.storage.push(file);
    }

    addFolder(folder: IFolder) {
        this.storage.push(folder);
    }

    display() {
        this.storage.forEach(item => {
            if (item instanceof File) {
                item.display();    
            } else {
                console.log(`Folder: ${item.name}`);
                (item as IFolder).display();
            }
        });
    }
}

export class File implements IFile {
    
    name: string;
    text: string;
    
    constructor(name: string, text: string) {
        this.name = name;
        this.text = text;
    }

    display() {
        console.log(`File: ${this.name} - ${this.text}`);
    }
}