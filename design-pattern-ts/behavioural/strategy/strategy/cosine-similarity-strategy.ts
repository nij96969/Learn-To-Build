import { RecommendationStrategy } from '../interface/recommendation-strategy';
import { handleError } from '../../../utils/handleError';

export class CosineSimilarityStrategy implements RecommendationStrategy {
  recommend(userId: string): string[] {
    try {
      if (!userId || userId.trim() === '') {
        throw new Error('User ID is required');
      }

      console.log("Using Cosine Similarity for", userId);
      return ["Movie G", "Movie H"];
    } catch (error) {
      throw handleError(error, 'CosineSimilarityStrategy.recommend');
    }
  }
}
