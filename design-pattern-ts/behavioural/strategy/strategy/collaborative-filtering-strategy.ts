import { RecommendationStrategy } from '../interface/recommendation-strategy';
import { handleError } from '../../../utils/handleError';

export class CollaborativeFilteringStrategy implements RecommendationStrategy {
  recommend(userId: string): string[] {
    try {
      if (!userId || userId.trim() === '') {
        throw new Error('User ID is required');
      }

      console.log("Using Collaborative Filtering for", userId);
      return ["Movie A", "Movie B"];
    } catch (error) {
      throw handleError(error, 'CollaborativeFilteringStrategy.recommend');
    }
  }
}
