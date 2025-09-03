import { LinearRegressionPipeline } from './pipelines/linear-regression-pipeline';
import { DecisionTreePipeline } from './pipelines/decision-tree-pipeline';
import { handleError } from '../../utils/handleError';
import { NeuralNetworkPipeline } from './pipelines/neural-network-pipeline';

async function demonstrateTemplatePipelines(): Promise<void> {
  try {
    console.log("Template Method Pattern - ML Pipeline Demo");
    console.log("=" .repeat(50));
    
    // Linear Regression Pipeline
    console.log("\n=== Linear Regression Pipeline ===");
    const regressionPipeline = new LinearRegressionPipeline();
    await regressionPipeline.runPipeline();
    
    console.log("\n" + "=".repeat(50));
    
    // Decision Tree Pipeline
    console.log("\n=== Decision Tree Pipeline ===");
    const treePipeline = new DecisionTreePipeline();
    await treePipeline.runPipeline();
    
    console.log("\n" + "=".repeat(50));
    console.log("All pipelines executed successfully!");
    
  } catch (error) {
    const handledError = handleError(error, 'Main.demonstrateTemplatePipelines');
    console.error("Pipeline execution failed:", handledError.message);
    throw handledError;
  }
}

async function demonstrateExtensibility(): Promise<void> {
  try {
    console.log("\nDemonstrating Template Method Extensibility");
    console.log("=" .repeat(50));
    
    console.log("\n=== Neural Network Pipeline (Extended) ===");
    const nnPipeline = new NeuralNetworkPipeline();
    await nnPipeline.runPipeline();
    
  } catch (error) {
    const handledError = handleError(error, 'Main.demonstrateExtensibility');
    console.error("Extended pipeline execution failed:", handledError.message);
    throw handledError;
  }
}

// Execute the demonstrations
(async () => {
  try {
    await demonstrateTemplatePipelines();
    await demonstrateExtensibility();
  } catch (error) {
    const handledError = handleError(error, 'Main.execution');
    console.error("Demo execution failed:", handledError.message);
    process.exit(1);
  }
})();
