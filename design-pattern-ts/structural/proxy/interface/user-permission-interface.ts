export interface IUserPermissionManager {
    addReadUser(userName: string): void;
    addWriteUser(userName: string): void;
    removeReadUser(userName: string): void;
    removeWriteUser(userName: string): void;
    hasReadAccess(userName: string): boolean;
    hasWriteAccess(userName: string): boolean;
    getReadUsers(): string[];
    getWriteUsers(): string[];
}

export interface IPermissionChecker {
    hasReadAccess(userName: string): boolean;
    hasWriteAccess(userName: string): boolean;
}