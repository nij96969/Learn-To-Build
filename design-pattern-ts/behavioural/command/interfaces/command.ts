// ICommand.ts
export interface ICommand {
    execute(): Promise<void>;
}
