export interface IFolder {
    storage: (IFile | IFolder)[];
    name: string;
    addFile(file: IFile): void;
    addFolder(folder: IFolder): void;
    display(): void;
}

export interface IFile {
    name: string;
    text: string;
    display(): void;
}