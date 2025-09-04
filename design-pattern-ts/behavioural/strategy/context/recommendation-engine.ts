import { RecommendationStrategy } from '../interface/recommendation-strategy';
import { handleError } from '../../../utils/handleError';

// Context
export class RecommendationEngine {
  constructor(private strategy: RecommendationStrategy) {}

  setStrategy(strategy: RecommendationStrategy): void {
    try {
      if (!strategy) {
        throw new Error('Strategy is required');
      }
      this.strategy = strategy;
    } catch (error) {
      throw handleError(error, 'RecommendationEngine.setStrategy');
    }
  }

  getRecommendations(userId: string): string[] {
    try {
      if (!this.strategy) {
        throw new Error('No strategy has been set');
      }
      
      return this.strategy.recommend(userId);
    } catch (error) {
      throw handleError(error, 'RecommendationEngine.getRecommendations');
    }
  }
}
