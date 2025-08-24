import { IDocument, IDocumentAccess } from "./interface/document-interface";
import { IPermissionChecker } from "./interface/user-permission-interface";
import { PermissionManager } from "./permission-manager";

export class RealDocument implements IDocument {
    constructor(public name: string){}

    read(user_name?: string): void {
        const userInfo = user_name ? ` by user ${user_name}` : '';
        console.log(`Reading document ${this.name}${userInfo}`);
    }

    write(user_name?: string): void {
        const userInfo = user_name ? ` by user ${user_name}` : '';
        console.log(`Writing document ${this.name}${userInfo}`);
    }
}


export class ProxyDocument implements IDocument {
    private permissionManager: PermissionManager;
    
    constructor(private realDocument: RealDocument, permissionManager?: PermissionManager) {
        // Create a new permission manager or use the provided one
        this.permissionManager = permissionManager || new PermissionManager(realDocument.name);
    }

    read(user_name?: string): void {
        if (!user_name) {
            console.log(`User name is required for document access`);
            return;
        }

        if (this.permissionManager.hasReadAccess(user_name)) {
            this.realDocument.read(user_name);
        } else {
            console.log(`User ${user_name} doesn't have read access to document ${this.realDocument.name}`);
        }
    }

    write(user_name?: string): void {
        if (!user_name) {
            console.log(`User name is required for document access`);
            return;
        }

        if (this.permissionManager.hasWriteAccess(user_name)) {
            this.realDocument.write(user_name);
        } else {
            console.log(`User ${user_name} doesn't have write access to document ${this.realDocument.name}`);
        }
    }

    // Getter to access the permission manager from outside
    getPermissionManager(): PermissionManager {
        return this.permissionManager;
    }

    // Helper method for backward compatibility
    addUser(name: string, access: IDocumentAccess): void {
        if (access.readAccess) {
            this.permissionManager.addReadUser(name);
        }
        if (access.writeAccess) {
            this.permissionManager.addWriteUser(name);
        }
    }
}