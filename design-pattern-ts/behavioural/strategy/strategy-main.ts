import { RecommendationEngine } from './context/recommendation-engine';
import { CollaborativeFilteringStrategy } from './strategy/collaborative-filtering-strategy';
import { ContentBasedStrategy } from './strategy/content-based-strategy';
import { KNNStrategy } from './strategy/knn-strategy';
import { CosineSimilarityStrategy } from './strategy/cosine-similarity-strategy';
import { handleError } from '../../utils/handleError';

// Usage
function demonstrateStrategyPattern(): void {
  try {
    console.log("=== Strategy Pattern Demo: Movie Recommendation System ===\n");

    // Initialize with Collaborative Filtering strategy
    const engine = new RecommendationEngine(new CollaborativeFilteringStrategy());

    console.log("1. Initial strategy (Collaborative Filtering):");
    console.log("Recommendations:", engine.getRecommendations("user123"));
    console.log();

    // Switch to Cosine Similarity strategy
    console.log("2. Switching to Cosine Similarity strategy:");

    engine.setStrategy(new CosineSimilarityStrategy());
    console.log("Recommendations:", engine.getRecommendations("user123"));
    console.log();

    // Switch to Content-Based strategy
    console.log("3. Switching to Content-Based strategy:");

    engine.setStrategy(new ContentBasedStrategy());
    console.log("Recommendations:", engine.getRecommendations("user456"));
    console.log();

    // Switch to KNN strategy
    console.log("4. Switching to KNN strategy:");
    engine.setStrategy(new KNNStrategy());
    console.log("Recommendations:", engine.getRecommendations("user789"));
    console.log();

    console.log("=== Strategy Pattern Demo Completed Successfully ===");

  } catch (error) {
    const handledError = handleError(error, 'Strategy Pattern Demo');
    console.error("Error:", handledError.message);
  }
}

// Run the demonstration
demonstrateStrategyPattern();
