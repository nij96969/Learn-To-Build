import { LinearRegressionPipeline } from './linear-regression-pipeline';
import { handleError } from '../../../utils/handleError';


export class NeuralNetworkPipeline extends LinearRegressionPipeline {
    loadData(): void {
      try {
        console.log("Loading tensor dataset for neural network...");
      } catch (error) {
        const handledError = handleError(error, 'NeuralNetworkPipeline.loadData');
        console.error(handledError.message);
        throw handledError;
      }
    }
  
    preprocess(): void {
      try {
        console.log("Neural network preprocessing: normalization and batching...");
      } catch (error) {
        const handledError = handleError(error, 'NeuralNetworkPipeline.preprocess');
        console.error(handledError.message);
        throw handledError;
      }
    }
  
    trainModel(): void {
      try {
        console.log("Training Neural Network with backpropagation...");
      } catch (error) {
        const handledError = handleError(error, 'NeuralNetworkPipeline.trainModel');
        console.error(handledError.message);
        throw handledError;
      }
    }
  }