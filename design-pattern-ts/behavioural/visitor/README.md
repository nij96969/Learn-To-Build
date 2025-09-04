# Visitor Pattern - E-commerce Shopping Cart System

## Applicability
```
Use the Visitor pattern when you need to perform operations on a group of similar objects without modifying their classes.

The Visitor pattern allows you to add new operations to existing object structures without modifying the structures themselves.

Use the Visitor when you have a stable class hierarchy but need to add new functionality frequently.

The pattern is particularly useful when you have different types of objects that need different treatment, but you want to avoid using instanceof checks or type casting.

Use the pattern when you want to define operations that span across multiple classes and group related operations together.

The Visitor pattern helps you separate algorithms from the objects they operate on, making your code more maintainable and following the Single Responsibility Principle.
```

## How to Implement
```
1. Declare the visitor interface with visit methods for each concrete element type.

2. Create concrete visitor classes that implement specific operations for each element type.

3. Declare the element interface with an accept method that takes a visitor as parameter.

4. Implement concrete element classes that call the appropriate visitor method in their accept method.

5. The client creates visitors and passes them to elements via the accept method.

6. Elements delegate the operation to the visitor, allowing the visitor to access element data and perform operations.
```

## Overview
The Visitor pattern allows you to define new operations without changing the classes of the elements on which it operates. It separates algorithms from the object structure, making it easy to add new operations.

## Implementation
This implementation demonstrates an e-commerce shopping cart system where different visitors can perform operations like calculating discounts and shipping costs on products (books and electronics).

## Folder Structure
```
visitor/
├── interfaces/
│   ├── visitor.ts                    # Visitor interface
│   └── element.ts                    # Element interface
├── elements/
│   ├── book.ts                       # Book product element
│   └── electronics.ts                # Electronics product element
├── visitor/
│   ├── discount-visitor.ts           # Discount calculation visitor
│   └── shipping-visitor.ts           # Shipping cost visitor
├── context/
│   └── shopping-cart.ts              # Shopping cart context class
├── visitor-main.ts                   # Usage demonstration
└── README.md
```

## Components

### Visitor Interface
- `ProductVisitor`: Declares visit methods for each concrete element type (Book, Electronics)

### Concrete Visitors
- `DiscountVisitor`: Calculates different discount rates for different product types
  - Books: 10% discount
  - Electronics: 5% discount
- `ShippingVisitor`: Calculates shipping costs for different product types
  - Books: $5 shipping
  - Electronics: $20 shipping

### Element Interface
- `ProductElement`: Declares the accept method and common properties

### Concrete Elements
- `Book`: Represents book products with price validation
- `Electronics`: Represents electronic products with price validation

### Context Class
- `ShoppingCart`: Context class that manages products and coordinates visitor operations
  - Manages the collection of product elements
  - Provides methods to apply visitors to all products
  - Handles cart operations (add, remove, clear, summary)
  - Implements comprehensive error handling

### Additional Features
- Comprehensive error handling with context
- Total calculations and free shipping logic
- Cart management operations
- Summary and statistics methods

## Key Benefits
1. **Open/Closed Principle**: Easy to add new operations (visitors) without modifying existing elements
2. **Single Responsibility**: Each visitor focuses on one specific operation
3. **Separation of Concerns**: Algorithms are separated from data structures
4. **Type Safety**: Compile-time checking ensures all element types are handled
5. **Reusability**: Visitors can be reused across different object structures

## Error Handling
All methods include comprehensive error handling using the `handleError` utility function, providing context for debugging and better error messages. The implementation includes:
- Input validation for null/undefined values
- Price validation (no negative prices)
- Proper error context for debugging

## Usage
Run the main file to see the Visitor pattern in action:
```bash
npx ts-node visitor-main.ts
```

## Example Output
```
🛒 === Visitor Pattern Demo: E-commerce Shopping Cart ===

📦 Adding products to cart...
✅ Cart contains 4 items
💰 Total cart value: $1800.00

🏷️  === Calculating Discounts ===
📚 Book - Original: $100.00, Discount: $10.00 (10%), Final: $90.00
⚡ Electronics - Original: $1000.00, Discount: $50.00 (5%), Final: $950.00
📚 Book - Original: $200.00, Discount: $20.00 (10%), Final: $180.00
⚡ Electronics - Original: $500.00, Discount: $25.00 (5%), Final: $475.00
💸 Total discount: $105.00
💵 Final total after discount: $1695.00

🚚 === Calculating Shipping Costs ===
📦 Book (Price: $100.00) - Shipping Cost: $5
📦 Electronics (Price: $1000.00) - Shipping Cost: $20
📦 Book (Price: $200.00) - Shipping Cost: $5
📦 Electronics (Price: $500.00) - Shipping Cost: $20
📦 Total shipping cost: $50.00
🆓 Free shipping eligible: Yes
🎉 Congratulations! You qualify for free shipping (order over $100)

💼 === Order Summary ===
📊 Items: 4
💰 Subtotal: $1800.00
🏷️  Discount: -$105.00
🚚 Shipping: FREE
💵 Grand Total: $1695.00
```

## When to Use This Pattern

### ✅ Use When:
- You have a stable object structure but need to add new operations frequently
- You want to avoid polluting classes with unrelated operations
- You need to perform operations across different types of objects
- You want to gather related operations in one place
- You need to maintain operations separately from the data structure

### ❌ Avoid When:
- The object structure changes frequently (adding new element types requires updating all visitors)
- You have simple operations that don't justify the pattern's complexity
- Performance is critical and you can't afford the double dispatch overhead
- You only have one type of operation to perform

## Design Patterns Synergy
This Visitor pattern implementation can be combined with:
- **Composite Pattern**: Visit nodes in a tree structure
- **Iterator Pattern**: Visit elements in a collection sequentially
- **Command Pattern**: Encapsulate visitor operations as commands
- **Strategy Pattern**: Choose different visitor strategies at runtime

## Advanced Features
- **Type-safe visitor dispatch**: TypeScript ensures all element types are handled
- **Extensible design**: Easy to add new visitor types or element types
- **Error resilience**: Comprehensive error handling and validation
- **Performance optimizations**: Efficient calculations and caching where appropriate
- **Real-world applicability**: Practical e-commerce scenarios with business logic
