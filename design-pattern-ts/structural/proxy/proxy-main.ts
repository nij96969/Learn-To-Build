import { RealDocument, ProxyDocument } from "./document";
import { PermissionManager } from "./permission-manager";

function main() {
    console.log("=== Simple Proxy Pattern Demo ===\n");

    // Create a real document
    const document = new RealDocument("secret-document.txt");
    
    // Create permission manager
    const permManager = new PermissionManager(document.name);
    
    // Create proxy with permission manager
    const proxyDoc = new ProxyDocument(document, permManager);

    console.log("1. Setting up permissions:\n");
    
    // Add some users with different permissions
    permManager.addReadUser("alice");
    permManager.addWriteUser("admin");
    permManager.displayPermissions();

    console.log("2. Testing access through proxy:\n");

    // Test read access
    proxyDoc.read("alice");     // ✓ Should work (has read permission)
    proxyDoc.read("admin");     // ✓ Should work (write users can also read)
    proxyDoc.read("bob");       // ✗ Should fail (no permission)

    console.log("\n3. Testing write access:\n");

    // Test write access
    proxyDoc.write("alice");    // ✗ Should fail (only has read permission)
    proxyDoc.write("admin");    // ✓ Should work (has write permission)
    proxyDoc.write("bob");      // ✗ Should fail (no permission)

    console.log("\n4. Testing without user:\n");

    // Test edge cases
    proxyDoc.read();            // ✗ Should fail (no user provided)
    proxyDoc.write("");         // ✗ Should fail (empty user)
    
    console.log("\n=== Demo completed ===");
}

// Run the demo
main();
