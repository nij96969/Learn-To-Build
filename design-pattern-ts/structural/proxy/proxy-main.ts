import { RealDocument, ProxyDocument } from "./document";
import { PermissionManager } from "./permission-manager";

function main() {
    console.log("=== Proxy Pattern with Separate Permission Manager Demo ===\n");

    // Create real documents
    const doc1 = new RealDocument("Project_Proposal.pdf");
    const doc2 = new RealDocument("Financial_Report.xlsx");
    const doc3 = new RealDocument("Technical_Specs.md");

    // Create separate permission managers for each document
    const permManager1 = new PermissionManager(doc1.name);
    const permManager2 = new PermissionManager(doc2.name);
    const permManager3 = new PermissionManager(doc3.name);

    // Create proxy documents with their respective permission managers
    const proxyDoc1 = new ProxyDocument(doc1, permManager1);
    const proxyDoc2 = new ProxyDocument(doc2, permManager2);
    const proxyDoc3 = new ProxyDocument(doc3, permManager3);

    console.log("1. Setting up user permissions using Permission Managers:\n");

    // Document 1: Project Proposal - Mixed permissions
    permManager1.addReadUser("alice");
    permManager1.addReadUser("bob");
    permManager1.addWriteUser("charlie");
    permManager1.addWriteUser("diana");
    permManager1.displayPermissions();

    // Document 2: Financial Report - Restricted access
    permManager2.addReadUser("alice");
    permManager2.addWriteUser("diana");
    permManager2.displayPermissions();

    // Document 3: Technical Specs - Open read, limited write
    permManager3.addReadUser("alice");
    permManager3.addReadUser("bob");
    permManager3.addReadUser("charlie");
    permManager3.addReadUser("eve");
    permManager3.addWriteUser("alice");
    permManager3.addWriteUser("charlie");
    permManager3.displayPermissions();

    console.log("2. Testing read access:\n");

    // Test read access for different users on different documents
    proxyDoc1.read("alice");      // Should work (read permission)
    proxyDoc1.read("charlie");    // Should work (write permission gives read)
    proxyDoc1.read("eve");        // Should fail (no permission)

    proxyDoc2.read("alice");      // Should work (read permission)
    proxyDoc2.read("bob");        // Should fail (no permission)
    proxyDoc2.read("diana");      // Should work (write permission gives read)

    console.log("\n3. Testing write access:\n");

    // Test write access for different users on different documents
    proxyDoc1.write("alice");     // Should fail (only read permission)
    proxyDoc1.write("charlie");   // Should work (write permission)
    proxyDoc1.write("eve");       // Should fail (no permission)

    proxyDoc2.write("alice");     // Should fail (only read permission)
    proxyDoc2.write("diana");     // Should work (write permission)

    proxyDoc3.write("bob");       // Should fail (only read permission)
    proxyDoc3.write("alice");     // Should work (write permission)

    console.log("\n4. Testing permission management through Permission Managers:\n");

    // Remove permissions and test
    permManager1.removeReadUser("alice");
    permManager1.removeWriteUser("charlie");
    
    console.log("After removing permissions:");
    permManager1.displayPermissions();
    
    proxyDoc1.read("alice");      // Should fail (permission removed)
    proxyDoc1.write("charlie");   // Should fail (permission removed)

    console.log("\n5. Adding new permissions through Permission Managers:\n");

    // Add new permissions
    permManager2.addWriteUser("bob");
    permManager3.addReadUser("frank");

    console.log("Updated permissions:");
    permManager2.displayPermissions();
    permManager3.displayPermissions();

    proxyDoc2.write("bob");       // Should work (new write permission)
    proxyDoc3.read("frank");      // Should work (new read permission)

    console.log("\n6. Testing edge cases:\n");

    // Test with undefined user
    proxyDoc1.read();             // Should fail (no user provided)
    proxyDoc1.write();            // Should fail (no user provided)

    // Test with empty string user
    proxyDoc1.read("");           // Should fail (empty user)
    proxyDoc1.write("");          // Should fail (empty user)

    console.log("\n7. Demonstrating separation of concerns:\n");

    // Show that permission management is separate from proxy
    console.log("=== Permission Manager Statistics ===");
    console.log(`Document 1 total users: ${permManager1.getTotalUsersCount()}`);
    console.log(`Document 2 total users: ${permManager2.getTotalUsersCount()}`);
    console.log(`Document 3 total users: ${permManager3.getTotalUsersCount()}`);

    console.log("\n=== Permission Lists (accessed through managers) ===");
    console.log("Document 1 - Read Users:", permManager1.getReadUsers());
    console.log("Document 1 - Write Users:", permManager1.getWriteUsers());

    console.log("Document 2 - Read Users:", permManager2.getReadUsers());
    console.log("Document 2 - Write Users:", permManager2.getWriteUsers());

    console.log("Document 3 - Read Users:", permManager3.getReadUsers());
    console.log("Document 3 - Write Users:", permManager3.getWriteUsers());

    console.log("\n8. Demonstrating shared permission manager:\n");

    // Create a shared permission manager for multiple documents
    const sharedManager = new PermissionManager("Shared_Documents");
    sharedManager.addReadUser("admin");
    sharedManager.addWriteUser("admin");
    
    const sharedDoc1 = new ProxyDocument(new RealDocument("Shared_Doc_1.txt"), sharedManager);
    const sharedDoc2 = new ProxyDocument(new RealDocument("Shared_Doc_2.txt"), sharedManager);
    
    console.log("Using shared permission manager for multiple documents:");
    sharedDoc1.read("admin");     // Should work
    sharedDoc2.write("admin");    // Should work
    sharedDoc1.read("guest");     // Should fail
    
    console.log("\n=== Demo completed ===");
}

// Run the demo
main();
