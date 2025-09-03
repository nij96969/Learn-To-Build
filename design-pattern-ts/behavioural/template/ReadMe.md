# Template Method Pattern - ML Pipeline Implementation

The Template Method Pattern shines in workflow-driven systems (pipelines, authentication, payments, DevOps) where structure must stay consistent across the org, but specific steps need custom implementations.

## Overview

This implementation demonstrates the Template Method pattern using Machine Learning pipelines. The pattern defines the skeleton of an algorithm (ML pipeline workflow) in a base class, allowing subclasses to override specific steps without changing the algorithm's structure.

## Structure

```
template/
├── interfaces/
│   └── ml-pipeline.ts           # Interface defining ML pipeline contract
├── pipelines/
│   ├── linear-regression-pipeline.ts    # Concrete regression implementation
│   └── decision-tree-pipeline.ts        # Concrete classification implementation
├── abstract-ml-pipeline.ts      # Abstract base class with template method
├── template-main.ts             # Main demonstration file
└── ReadMe.md                    # This file
```

## Key Components

### 1. Template Method (`runPipeline()`)
- Defines the skeleton of the ML pipeline algorithm
- Should **not** be overridden by subclasses
- Ensures consistent workflow: Load → Preprocess → Train → Evaluate → Save

### 2. Abstract Methods
- `loadData()`: Must be implemented by concrete classes
- `trainModel()`: Must be implemented by concrete classes

### 3. Hook Methods
- `preprocess()`: Has default implementation, can be overridden
- `evaluate()`: Has default implementation, can be overridden
- `saveModel()`: Concrete method, usually doesn't need overriding

## Usage

```typescript
// Run the demonstration
npm run template-demo

// Or execute directly
npx ts-node design-pattern-ts/behavioural/template/template-main.ts
```

## Real-World Applications

1. **ML/Data Science Pipelines**: Consistent preprocessing → training → evaluation flow
2. **CI/CD Pipelines**: Build → test → deploy workflow
3. **Authentication Flows**: Validate → authenticate → authorize → log
4. **Payment Processing**: Validate → charge → confirm → notify
5. **Web Framework Lifecycle**: Request → middleware → controller → response

## Relation with Other Design Patterns

### Strategy vs Template Method

- **Strategy**: encapsulates interchangeable algorithms, chosen at runtime.
- **Template Method**: enforces a fixed algorithm structure, subclasses vary only specific steps.

Industry use: In ML pipelines, Strategy picks which model (SVM, NN), Template enforces preprocessing → training → evaluation.

### Factory Method vs Template Method

- **Factory**: defines object creation in subclasses.
- **Template**: defines algorithm steps in subclasses.

Often used together (e.g., a Template Method calls a Factory Method to create objects).

### Hook Methods (Template's extension point)

Template Method often uses hooks → optional steps that subclasses may override.

E.g., in web frameworks (Django, Spring), lifecycle hooks follow this.

## Why Industry Loves Template Method?

- **Consistency** – critical in enterprise workflows.
- **Extensibility** – new variations require subclass, not rewriting algorithm.
- **Reusability** – common logic is centralized.
- **Governance** – ensures teams don't "skip steps" in critical flows (like security logging).

## Error Handling

All methods use the centralized `handleError` utility function for consistent error handling and logging throughout the pipeline execution.