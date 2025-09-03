/**
 * Interface defining the contract for ML Pipeline operations
 */
export interface IMLPipeline {
  runPipeline(): Promise<void>;
  loadData(): void;
  preprocess(): void;
  trainModel(): void;
  evaluate(): void;
  saveModel(): void;
}
