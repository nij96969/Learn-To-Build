export interface IStorage {
    name: string;
    display(): void;
    add?(child: IStorage): void;
    remove?(child: IStorage): void;
    getChild?(index: number): IStorage | null;
}