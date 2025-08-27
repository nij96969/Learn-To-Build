import { WatchStyle1, WatchContext } from "../watch-gui";
import { TimeFormatFactory } from "../time-format-factory";
import { handleError } from "../../../utils/handleError";

console.log("🔧 Manual Error Testing - Modify this file to test specific scenarios\n");

function testScenario(scenarioName: string, testFunction: () => void) {
    console.log(`=== ${scenarioName} ===`);
    try {
        testFunction();
        console.log("❌ FAILED: Expected error but none was thrown");
    } catch (error) {
        console.log("✅ PASSED: Error caught successfully");
        console.log("Error message:", error instanceof Error ? error.message : String(error));
    }
    console.log();
}

// Scenario 1: Test invalid timezone (MODIFY THESE VALUES TO TEST)
testScenario("Invalid Timezone Test", () => {
    const flyweight = TimeFormatFactory.getTimeFormat(
        "BadZone/Invalid",  // 👈 Change this to test different invalid timezones
        "en-US",
        { hour: '2-digit', minute: '2-digit' }
    );
    flyweight.formatTime(new Date());
});

// Scenario 2: Test empty/null parameters (MODIFY THESE VALUES TO TEST)
testScenario("Empty Parameters Test", () => {
    TimeFormatFactory.getTimeFormat(
        "",          // 👈 Try: "", null, undefined
        "en-US",     // 👈 Try: "", null, undefined, "invalid-locale"
        { hour: '2-digit' }
    );
});

// Scenario 3: Test watch rendering with problematic setup
testScenario("Watch Render Error Test", () => {
    const context = new WatchContext(10, 20);
    const watch = new WatchStyle1(context);
    
    // Force an error in the render process
    // 👈 Modify the flyweight to cause different errors
    watch['timeFlyweight'].formatTime = () => {
        throw new Error("Custom error for testing");  // 👈 Change this error message
    };
    
    watch.render();
});

// Scenario 4: Test error context chaining
testScenario("Context Chaining Test", () => {
    const baseError = new Error("Original error message");  // 👈 Change this message
    
    // Simulate error passing through multiple functions
    let error = handleError(baseError, "Function1");       // 👈 Change context names
    error = handleError(error, "Function2");
    error = handleError(error, "Function3");
    
    throw error;
});

// Scenario 5: Test with different error types
testScenario("Different Error Types Test", () => {
    // 👈 Uncomment ONE of these lines to test different error types:
    
    throw handleError("String error message", "TestContext");
    // throw handleError(404, "TestContext");
    // throw handleError({ code: 500, message: "Object error" }, "TestContext");
    // throw handleError(new TypeError("Type error"), "TestContext");
    // throw handleError(null, "TestContext");
    // throw handleError(undefined, "TestContext");
});

console.log("💡 How to use this file:");
console.log("1. Modify the values marked with 👈 arrows");
console.log("2. Uncomment different lines in the test scenarios");
console.log("3. Run: npx ts-node structural/flyweight/manual-error-test.ts");
console.log("4. Observe how errors propagate and get formatted");
console.log("\n🎯 Try these specific tests:");
console.log("- Invalid timezones: 'Bad/Zone', 'Invalid/Time', ''");
console.log("- Invalid locales: 'bad-locale', '', 'xyz-123'"); 
console.log("- Empty parameters: null, undefined, ''");
console.log("- Different error types: strings, numbers, objects");
