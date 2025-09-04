// Strategy Interface
export interface RecommendationStrategy {
  recommend(userId: string): string[];
}
