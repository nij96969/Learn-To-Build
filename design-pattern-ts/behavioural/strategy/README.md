# Strategy Pattern - Movie Recommendation System

 ##Applicability
 ```
 Use the Strategy pattern when you want to use different variants of an algorithm within an object and be able to switch from one algorithm to another during runtime.

 The Strategy pattern lets you indirectly alter the object’s behavior at runtime by associating it with different sub-objects which can perform specific sub-tasks in different ways.

 Use the Strategy when you have a lot of similar classes that only differ in the way they execute some behavior.

 The Strategy pattern lets you extract the varying behavior into a separate class hierarchy and combine the original classes into one, thereby reducing duplicate code.

 Use the pattern to isolate the business logic of a class from the implementation details of algorithms that may not be as important in the context of that logic.

 The Strategy pattern lets you isolate the code, internal data, and dependencies of various algorithms from the rest of the code. Various clients get a simple interface to execute the algorithms and switch them at runtime.

 Use the pattern when your class has a massive conditional statement that switches between different variants of the same algorithm.

 The Strategy pattern lets you do away with such a conditional by extracting all algorithms into separate classes, all of which implement the same interface. The original object delegates execution to one of these objects, instead of implementing all variants of the algorithm.
 ```

 ##How to Implement
```
In the context class, identify an algorithm that’s prone to frequent changes. It may also be a massive conditional that selects and executes a variant of the same algorithm at runtime.

Declare the strategy interface common to all variants of the algorithm.

One by one, extract all algorithms into their own classes. They should all implement the strategy interface.

In the context class, add a field for storing a reference to a strategy object. Provide a setter for replacing values of that field. The context should work with the strategy object only via the strategy interface. The context may define an interface which lets the strategy access its data.

Clients of the context must associate it with a suitable strategy that matches the way they expect the context to perform its primary job.
```

## Overview
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. This allows the algorithm to vary independently from clients that use it.

## Implementation
This implementation demonstrates a movie recommendation system that can switch between different recommendation strategies at runtime.

## Folder Structure
```
strategy/
├── interface/
│   └── recommendation-strategy.ts     # Strategy interface
├── strategy/
│   ├── collaborative-filtering-strategy.ts
│   ├── content-based-strategy.ts
│   ├── knn-strategy.ts
│   └── cosine-similarity-strategy.ts
├── context/
│   └── recommendation-engine.ts       # Context class
├── strategy-main.ts                   # Usage demonstration
└── README.md
```

## Components

### Strategy Interface
- `RecommendationStrategy`: Defines the common interface for all concrete strategies

### Concrete Strategies
- `CollaborativeFilteringStrategy`: Recommends based on user similarity
- `ContentBasedStrategy`: Recommends based on content similarity
- `KNNStrategy`: Recommends using K-Nearest Neighbors algorithm
- `CosineSimilarityStrategy`: Recommends using cosine similarity calculations

### Context
- `RecommendationEngine`: Maintains a reference to a strategy object and delegates work to it

## Key Benefits
1. **Runtime Algorithm Selection**: Switch between algorithms dynamically
2. **Open/Closed Principle**: Easy to add new strategies without modifying existing code
3. **Single Responsibility**: Each strategy focuses on one specific algorithm
4. **Testability**: Each strategy can be tested independently

## Error Handling
All methods include comprehensive error handling using the `handleError` utility function, providing context for debugging and better error messages.

## Usage
Run the main file to see the Strategy pattern in action:
```bash
npx ts-node strategy-main.ts
```

## Example Output
```
=== Strategy Pattern Demo: Movie Recommendation System ===

1. Initial strategy (Collaborative Filtering):
Using Collaborative Filtering for user123
Recommendations: [ 'Movie A', 'Movie B' ]

2. Switching to Cosine Similarity strategy:
Using Cosine Similarity for user123
Recommendations: [ 'Movie G', 'Movie H' ]
```
