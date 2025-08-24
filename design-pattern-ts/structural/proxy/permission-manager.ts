import { IUserPermissionManager } from "./interface/user-permission-interface";

export class PermissionManager implements IUserPermissionManager {
    private readUsers: Set<string> = new Set<string>();
    private writeUsers: Set<string> = new Set<string>();
    
    constructor(private documentName: string) {}

    addReadUser(userName: string): void {
        this.readUsers.add(userName);
        console.log(`User ${userName} added to read list for document ${this.documentName}`);
    }

    addWriteUser(userName: string): void {
        this.writeUsers.add(userName);
        console.log(`User ${userName} added to write list for document ${this.documentName}`);
    }

    removeReadUser(userName: string): void {
        this.readUsers.delete(userName);
        console.log(`User ${userName} removed from read list for document ${this.documentName}`);
    }

    removeWriteUser(userName: string): void {
        this.writeUsers.delete(userName);
        console.log(`User ${userName} removed from write list for document ${this.documentName}`);
    }

    hasReadAccess(userName: string): boolean {
        // Users with write access automatically have read access
        return this.readUsers.has(userName) || this.writeUsers.has(userName);
    }

    hasWriteAccess(userName: string): boolean {
        return this.writeUsers.has(userName);
    }

    getReadUsers(): string[] {
        // Return all users who can read (read users + write users)
        const allReadUsers = new Set([...this.readUsers, ...this.writeUsers]);
        return Array.from(allReadUsers);
    }

    getWriteUsers(): string[] {
        return Array.from(this.writeUsers);
    }

    // Additional utility methods for the permission manager
    displayPermissions(): void {
        console.log(`\n=== Permissions for document ${this.documentName} ===`);
        console.log(`Read Users: ${this.getReadUsers().join(', ') || 'None'}`);
        console.log(`Write Users: ${this.getWriteUsers().join(', ') || 'None'}`);
        console.log('================================================\n');
    }

    clearAllPermissions(): void {
        this.readUsers.clear();
        this.writeUsers.clear();
        console.log(`All permissions cleared for document ${this.documentName}`);
    }

    hasAnyPermissions(userName: string): boolean {
        return this.hasReadAccess(userName) || this.hasWriteAccess(userName);
    }

    getTotalUsersCount(): number {
        const allUsers = new Set([...this.readUsers, ...this.writeUsers]);
        return allUsers.size;
    }
}
