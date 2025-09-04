import { RecommendationStrategy } from '../interface/recommendation-strategy';
import { handleError } from '../../../utils/handleError';

export class KNNStrategy implements RecommendationStrategy {
  recommend(userId: string): string[] {
    try {
      if (!userId || userId.trim() === '') {
        throw new Error('User ID is required');
      }

      console.log("Using KNN Similarity for", userId);
      return ["Movie E", "Movie F"];
    } catch (error) {
      throw handleError(error, 'KNNStrategy.recommend');
    }
  }
}
