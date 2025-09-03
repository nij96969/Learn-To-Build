import { IMLPipeline } from '../interfaces/ml-pipeline';
import { handleError } from '../../../utils/handleError';

/**
 * Abstract base class implementing the Template Method pattern for ML pipelines
 * This class defines the skeleton of the ML pipeline algorithm
 */
export abstract class AbstractMLPipeline implements IMLPipeline {
  
  /**
   * Template Method - defines the skeleton of the ML pipeline algorithm
   * This method should not be overridden by subclasses
   */
  async runPipeline(): Promise<void> {
    try {
      console.log("Starting ML Pipeline...");
      
      this.loadData();
      this.preprocess();
      this.trainModel();
      this.evaluate();
      this.saveModel();
      
      console.log("ML Pipeline completed successfully!");
    } catch (error) {
      const handledError = handleError(error, 'MLPipeline.runPipeline');
      console.error(handledError.message);
      throw handledError;
    }
  }

  /**
   * Abstract method - must be implemented by concrete subclasses
   * Each pipeline type loads data differently
   */
  abstract loadData(): void;

  /**
   * Hook method with default implementation
   * Subclasses can override this for custom preprocessing
   */
  preprocess(): void {
    try {
      console.log("Default preprocessing: scaling and cleaning...");
    } catch (error) {
      const handledError = handleError(error, 'AbstractMLPipeline.preprocess');
      console.error(handledError.message);
      throw handledError;
    }
  }

  /**
   * Abstract method - must be implemented by concrete subclasses
   * Each pipeline type trains models differently
   */
  abstract trainModel(): void;

  /**
   * Hook method with default implementation
   * Subclasses can override this for custom evaluation metrics
   */
  evaluate(): void {
    try {
      console.log("Evaluating model with default metrics (accuracy, F1-score)...");
    } catch (error) {
      const handledError = handleError(error, 'AbstractMLPipeline.evaluate');
      console.error(handledError.message);
      throw handledError;
    }
  }

  /**
   * Concrete method with default implementation
   * Usually doesn't need to be overridden
   */
  saveModel(): void {
    try {
      console.log("Saving model to storage...");
    } catch (error) {
      const handledError = handleError(error, 'AbstractMLPipeline.saveModel');
      console.error(handledError.message);
      throw handledError;
    }
  }
}
