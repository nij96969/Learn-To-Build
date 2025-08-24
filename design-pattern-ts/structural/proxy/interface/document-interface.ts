export interface IDocument {
    read(user_name?: string): void;
    write(user_name?: string): void;
}

export interface IDocumentAccess {
    readAccess: boolean;
    writeAccess: boolean;
}