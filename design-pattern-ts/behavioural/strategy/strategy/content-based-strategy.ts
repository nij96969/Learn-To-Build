import { RecommendationStrategy } from '../interface/recommendation-strategy';
import { handleError } from '../../../utils/handleError';

export class ContentBasedStrategy implements RecommendationStrategy {
  recommend(userId: string): string[] {
    try {
      if (!userId || userId.trim() === '') {
        throw new Error('User ID is required');
      }

      console.log("Using Content-Based Filtering for", userId);
      return ["Movie C", "Movie D"];
    } catch (error) {
      throw handleError(error, 'ContentBasedStrategy.recommend');
    }
  }
}
