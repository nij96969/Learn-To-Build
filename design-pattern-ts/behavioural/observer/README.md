# Observer Pattern - Stock Subscription System

## Overview

This implementation demonstrates the **Observer Pattern** using a stock subscription system. The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

## Pattern Structure

```
Subject (Observable) ←→ Observer
      ↑                    ↑
    Stock            Investor, TradingBot
```

## Components

### Core Interfaces

#### `Observer` Interface
Defines the contract for objects that want to be notified of changes.
```typescript
interface Observer {
  update(data: any): void;
}
```

#### `Subject` Interface
Defines the contract for objects that can be observed.
```typescript
interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(data: any): void;
}
```

#### `StockData` Interface
Represents the structure of stock information passed to observers.
```typescript
interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: Date;
  volume: number;
}
```

### Concrete Implementations

#### `Stock` Class (Subject)
- Manages a list of subscribers (observers)
- Notifies all subscribers when stock price changes
- Handles subscription/unsubscription operations
- Provides robust error handling and validation

**Key Methods:**
- `subscribe(observer: Observer)` - Add an observer
- `unsubscribe(observer: Observer)` - Remove an observer
- `updatePrice(newPrice: number, volume?: number)` - Update price and notify observers
- `notify(data: StockData)` - Notify all observers of changes

#### `Investor` Class (Observer)
- Represents individual investors who track stock updates
- Receives notifications about price changes
- Displays formatted price update information

**Key Methods:**
- `update(data: StockData)` - Receives stock updates and displays investor-specific information

#### `TradingBot` Class (Observer)
- Represents automated trading systems
- Makes trading decisions based on price thresholds
- Maintains trading history
- Configurable buy/sell thresholds

**Key Methods:**
- `update(data: StockData)` - Analyzes stock data and executes trades
- `getTradingHistory()` - Returns complete trading history

## Usage Example

```typescript
import { Stock } from './stock';
import { Investor } from './subscribers/investor';
import { TradingBot } from './subscribers/trading-bot';

// Create a stock (Subject)
const appleStock = new Stock('AAPL', 150.00, 1000000);

// Create observers
const investor = new Investor('Alice Johnson');
const tradingBot = new TradingBot('AlgoTrader Pro', -3.0, 4.0);

// Subscribe observers to the stock
appleStock.subscribe(investor);
appleStock.subscribe(tradingBot);

// Update stock price - all observers will be notified
appleStock.updatePrice(145.00, 1500000); // -3.33% decrease
```

## Running the Demo

Execute the main demonstration file to see the observer pattern in action:

```bash
npx tsx behavioural/observer/observer-main.ts
```

## Demo Features

The demonstration includes:

1. **Stock Creation**: Multiple stocks (AAPL, TSLA, GOOGL) with different initial prices
2. **Multiple Subscribers**: Various investors and trading bots with different configurations
3. **Price Updates**: Simulated market movements with different volatilities
4. **Trading Logic**: Bots execute trades based on configurable thresholds
5. **Subscription Management**: Dynamic subscribe/unsubscribe operations
6. **Error Handling**: Comprehensive error handling and edge case testing

## Key Benefits Demonstrated

### 1. **Loose Coupling**
- Stocks don't need to know specific details about their observers
- Observers only need to implement the `Observer` interface
- Easy to add new types of observers without modifying existing code

### 2. **Dynamic Relationships**
- Observers can subscribe/unsubscribe at runtime
- No compile-time dependencies between subjects and observers

### 3. **Broadcast Communication**
- Single price update notifies all interested parties simultaneously
- Efficient one-to-many communication pattern

### 4. **Extensibility**
- Easy to add new observer types (e.g., NewsAlertService, PortfolioManager)
- New stock types can be added without affecting existing observers

## Real-World Applications

This pattern is commonly used in:

- **Financial Systems**: Stock price updates, market data feeds
- **GUI Applications**: Model-View architectures, event handling
- **Notification Systems**: Email alerts, push notifications
- **Real-time Data**: Live dashboards, monitoring systems
- **Game Development**: Event systems, state changes

## Error Handling

The implementation includes comprehensive error handling:

- **Input Validation**: All parameters are validated before processing
- **Graceful Failures**: Individual observer failures don't affect other observers
- **Detailed Logging**: Clear error messages with context information
- **Edge Cases**: Handles duplicate subscriptions, invalid data, etc.

## File Structure

```
observer/
├── README.md                    # This documentation
├── observer-main.ts            # Main demonstration file
├── stock.ts                    # Stock class (Subject implementation)
├── interface/
│   ├── observer.ts            # Observer interface
│   ├── subject.ts             # Subject interface
│   └── stock-data.ts          # StockData interface
└── subscribers/
    ├── investor.ts            # Investor class (Observer implementation)
    └── trading-bot.ts         # TradingBot class (Observer implementation)
```

## Design Principles Applied

- **Single Responsibility**: Each class has a clear, focused purpose
- **Open/Closed**: Easy to extend with new observer types without modifying existing code
- **Interface Segregation**: Clean, minimal interfaces
- **Dependency Inversion**: Depends on abstractions (interfaces) rather than concrete classes

## Performance Considerations

- **Memory Management**: Observers are stored in arrays for efficient iteration
- **Error Isolation**: Failed observer notifications don't affect other observers
- **Lazy Evaluation**: Trading history is only computed when requested
- **Efficient Notifications**: Direct method calls rather than event queues for simplicity

## Testing

The demo includes edge case testing:

- Duplicate subscription attempts
- Unsubscribing non-existent observers
- Invalid data handling
- Empty observer lists
- Error recovery scenarios

Run the demo to see all test cases in action!
