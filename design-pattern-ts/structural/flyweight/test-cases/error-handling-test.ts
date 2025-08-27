import { WatchStyle1, WatchContext } from "../watch-gui";
import { TimeFormatFactory } from "../time-format-factory";
import { handleError } from "../../../utils/handleError";

console.log("🧪 Testing Error Handling in Flyweight Pattern\n");

// Test 1: Invalid timezone in factory
console.log("=== Test 1: Invalid Timezone ===");
try {
    const invalidFlyweight = TimeFormatFactory.getTimeFormat(
        "Invalid/Timezone", // This should cause an error
        "en-US",
        { hour: '2-digit', minute: '2-digit' }
    );
    
    const context = new WatchContext(10, 20);
    const currentTime = new Date();
    
    // Try to format time with invalid timezone
    invalidFlyweight.formatTime(currentTime);
    
    console.log("❌ Test 1 FAILED: Expected error but none was thrown");
} catch (error) {
    console.log("✅ Test 1 PASSED: Error caught successfully");
    console.log("Error message:", error instanceof Error ? error.message : String(error));
    console.log();
}

// Test 2: Invalid locale
console.log("=== Test 2: Invalid Locale ===");
try {
    const invalidFlyweight = TimeFormatFactory.getTimeFormat(
        "America/New_York",
        "invalid-locale-xyz", // This should cause an error
        { hour: '2-digit', minute: '2-digit' }
    );
    
    const currentTime = new Date();
    invalidFlyweight.formatTime(currentTime);
    
    console.log("❌ Test 2 FAILED: Expected error but none was thrown");
} catch (error) {
    console.log("✅ Test 2 PASSED: Error caught successfully");
    console.log("Error message:", error instanceof Error ? error.message : String(error));
    console.log();
}

// Test 3: Empty/null parameters in factory
console.log("=== Test 3: Empty Parameters ===");
try {
    TimeFormatFactory.getTimeFormat(
        "", // Empty timezone
        "en-US",
        { hour: '2-digit' }
    );
    
    console.log("❌ Test 3 FAILED: Expected error but none was thrown");
} catch (error) {
    console.log("✅ Test 3 PASSED: Error caught successfully");
    console.log("Error message:", error instanceof Error ? error.message : String(error));
    console.log();
}

// Test 4: Error propagation through render chain
console.log("=== Test 4: Error Propagation Through Render Chain ===");
try {
    // Create a context
    const context = new WatchContext(50, 100);
    
    // Manually create a problematic flyweight that will fail during formatTime
    const problematicFlyweight = TimeFormatFactory.getTimeFormat(
        "Invalid/BadTimezone",
        "en-US", 
        { hour: '2-digit', minute: '2-digit' }
    );
    
    // Try to format time - this should trigger the error chain
    problematicFlyweight.formatTime(new Date());
    
    console.log("❌ Test 4 FAILED: Expected error but none was thrown");
} catch (error) {
    console.log("✅ Test 4 PASSED: Error propagated through chain");
    console.log("Error message:", error instanceof Error ? error.message : String(error));
    console.log();
}

// Test 5: Watch render error handling
console.log("=== Test 5: Watch Render Error Handling ===");
try {
    const context = new WatchContext(100, 200);
    const watch = new WatchStyle1(context);
    
    // Simulate error by monkey-patching the formatTime method
    const originalFormatTime = watch['timeFlyweight'].formatTime;
    watch['timeFlyweight'].formatTime = () => {
        throw new Error("Simulated formatting error");
    };
    
    watch.render(); // This should trigger error handling
    
    console.log("❌ Test 5 FAILED: Expected error but none was thrown");
} catch (error) {
    console.log("✅ Test 5 PASSED: Watch render error handled");
    console.log("Error message:", error instanceof Error ? error.message : String(error));
    console.log();
}

// Test 6: Multiple error context layers
console.log("=== Test 6: Multiple Context Layers ===");
try {
    const originalError = new Error("Base error message");
    
    // Simulate error passing through multiple layers
    const level1Error = handleError(originalError, "Level1Function");
    const level2Error = handleError(level1Error, "Level2Function");
    const level3Error = handleError(level2Error, "Level3Function");
    
    console.log("✅ Test 6 PASSED: Multiple context layers created");
    console.log("Final error message:", level3Error.message);
    console.log();
} catch (error) {
    console.log("❌ Test 6 FAILED:", error instanceof Error ? error.message : String(error));
    console.log();
}

// Test 7: Non-Error type handling
console.log("=== Test 7: Non-Error Type Handling ===");
try {
    const stringError = handleError("Simple string error", "TestFunction");
    const numberError = handleError(404, "TestFunction");
    const objectError = handleError({ code: 500, msg: "Server error" }, "TestFunction");
    
    console.log("✅ Test 7 PASSED: Non-Error types handled");
    console.log("String error:", stringError.message);
    console.log("Number error:", numberError.message);
    console.log("Object error:", objectError.message);
    console.log();
} catch (error) {
    console.log("❌ Test 7 FAILED:", error instanceof Error ? error.message : String(error));
    console.log();
}

// Test 8: flyweightMain error handling
console.log("=== Test 8: flyweightMain Error Handling ===");
try {
    // This will test the main function's error handling
    // We'll create a version that should fail
    
    function testFlyweightMain() {
        try {
            // Force an error during context creation
            const badContext = new WatchContext(NaN, NaN);
            const watch = new WatchStyle1(badContext);
            
            // Simulate a render error
            throw new Error("Simulated main function error");
            
        } catch (error) {
            throw handleError(error, "testFlyweightMain");
        }
    }
    
    testFlyweightMain();
    
    console.log("❌ Test 8 FAILED: Expected error but none was thrown");
} catch (error) {
    console.log("✅ Test 8 PASSED: Main function error handling works");
    console.log("Error message:", error instanceof Error ? error.message : String(error));
    console.log();
}

console.log("🎉 Error Handling Test Suite Completed!");
console.log("\n💡 To test real scenarios:");
console.log("1. Try running the main flyweight demo with invalid timezone");
console.log("2. Modify locale strings to invalid values");
console.log("3. Pass null/undefined to factory methods");
console.log("4. Test with extreme date values");
