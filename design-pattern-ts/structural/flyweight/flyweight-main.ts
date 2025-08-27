import { WatchStyle1, WatchStyle2, WatchStyle3, WatchContext } from "./watch-gui";
import { handleError } from "../../utils/handleError";

function flyweightMain() {
    try{
        console.log("=== Flyweight Pattern Demo ===\n");
        
        // Create contexts (extrinsic state)
        const context1 = new WatchContext(10, 20);
        const context2 = new WatchContext(50, 100);
        const context3 = new WatchContext(200, 300);
        
        // Create watches - they will share flyweights for same formatting
        const watch1a = new WatchStyle1(context1);
        const watch1b = new WatchStyle1(context2); // Should reuse same flyweight as watch1a
        
        const watch2 = new WatchStyle2(context1);
        const watch3 = new WatchStyle3(context3);
        
        // Render all watches
        watch1a.render();
        watch1b.render(); // Same flyweight, different context
        
        console.log("--------------------------------");
        
        watch2.render();
        
        console.log("--------------------------------");
        
        watch3.render();
        
        console.log("--------------------------------");
        
        // Create more watches of same styles to show flyweight reuse
        console.log("\n=== Creating more watches (should reuse flyweights) ===");
        const moreContext = new WatchContext(400, 500);
        const anotherWatch1 = new WatchStyle1(moreContext);
        const anotherWatch2 = new WatchStyle2(moreContext);
        
        anotherWatch1.render();
        anotherWatch2.render();
        
        console.log("(Notice: same count as before - flyweights were reused!)");
    } catch (error) {
        throw handleError(error, "flyweightMain");
    }
}

flyweightMain();