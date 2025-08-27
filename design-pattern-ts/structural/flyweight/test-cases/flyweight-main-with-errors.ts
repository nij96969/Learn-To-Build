import { WatchStyle1, WatchStyle2, WatchStyle3, WatchContext } from "../watch-gui";
import { handleError } from "../../../utils/handleError";

function flyweightMainWithErrors() {
    try {
        console.log("=== Flyweight Pattern Demo with Intentional Errors ===\n");
        
        // Test 1: Valid operations first
        console.log("1. Testing valid operations...");
        const context1 = new WatchContext(10, 20);
        const watch1 = new WatchStyle1(context1);
        watch1.render();
        console.log("✅ Valid operations work fine\n");
        
        // Test 2: Force an error with invalid timezone
        console.log("2. Testing invalid timezone...");
        try {
            // This will create a watch with an invalid timezone
            const invalidContext = new WatchContext(50, 100);
            
            // Manually create a problematic watch by accessing the factory with bad data
            // Note: We'll modify the TimeFormatFactory call to force an error
            
            // For testing, let's create a watch and then break its flyweight
            const watch2 = new WatchStyle2(invalidContext);
            
            // Force an error in the formatTime method
            const originalFormatTime = watch2['timeFlyweight'].formatTime;
            watch2['timeFlyweight'].formatTime = () => {
                throw new Error("Invalid timezone 'Test/BadZone' - this is a test error");
            };
            
            watch2.render(); // This should trigger error handling
            
        } catch (renderError) {
            console.log("✅ Render error caught and handled:");
            console.log("   ", renderError instanceof Error ? renderError.message : String(renderError));
            console.log();
        }
        
        // Test 3: Try with different error scenarios
        console.log("3. Testing context chain errors...");
        try {
            // Simulate a deeper error chain
            function deepFunction() {
                throw new Error("Deep function error");
            }
            
            function middleFunction() {
                try {
                    deepFunction();
                } catch (error) {
                    throw handleError(error, "middleFunction");
                }
            }
            
            function topFunction() {
                try {
                    middleFunction();
                } catch (error) {
                    throw handleError(error, "topFunction");
                }
            }
            
            topFunction();
            
        } catch (chainError) {
            console.log("✅ Error chain handled:");
            console.log("   ", chainError instanceof Error ? chainError.message : String(chainError));
            console.log();
        }
        
        console.log("4. Testing continues with more valid operations...");
        const context3 = new WatchContext(200, 300);
        const watch3 = new WatchStyle3(context3);
        watch3.render();
        console.log("✅ Operations continue after error handling\n");
        
        console.log("🎉 All error handling tests completed successfully!");
        
    } catch (error) {
        console.error("❌ Unhandled error in main function:");
        const mainError = handleError(error, "flyweightMainWithErrors");
        console.error("   ", mainError.message);
    }
}

console.log("🧪 Running flyweight demo with intentional errors for testing...\n");
flyweightMainWithErrors();

console.log("\n💡 Error Testing Tips:");
console.log("1. Watch how errors get context added as they bubble up");
console.log("2. Notice that the application continues after handling errors");
console.log("3. See how the error messages build up context chains");
console.log("4. Modify the error messages above to test different scenarios");
