import { Stock } from './stock';
import { Investor } from './subscribers/investor';
import { TradingBot } from './subscribers/trading-bot';

/**
 * Observer Pattern Demo - Stock Subscription System
 * 
 * This demonstrates how the Observer pattern can be used to create
 * a stock subscription system where:
 * - Stock (Subject) publishes price updates
 * - Various subscribers (Observers) receive and react to these updates
 */

function demonstrateObserverPattern(): void {
  console.log('🚀 Starting Observer Pattern Demo - Stock Subscription System\n');
  console.log('=' .repeat(70));
  console.log('📈 STOCK SUBSCRIPTION SYSTEM DEMONSTRATION');
  console.log('=' .repeat(70));
  console.log();

  // Create stocks (Subjects/Observables)
  const appleStock = new Stock('AAPL', 150.00, 1000000);
  const teslaStock = new Stock('TSLA', 800.00, 500000);
  const googleStock = new Stock('GOOGL', 2500.00, 200000);

  console.log('📊 Created stocks: AAPL ($150.00), TSLA ($800.00), GOOGL ($2500.00)\n');

  // Create subscribers (Observers)
  const investor1 = new Investor('Alice Johnson');
  const investor2 = new Investor('Bob Smith');
  const investor3 = new Investor('Carol Davis');

  const tradingBot1 = new TradingBot('AlgoTrader Pro', -3.0, 4.0); // More conservative
  const tradingBot2 = new TradingBot('QuickBot', -1.5, 2.0);      // More aggressive

  console.log('👥 Created subscribers:');
  console.log('   - 3 Investors: Alice, Bob, Carol');
  console.log('   - 2 Trading Bots: AlgoTrader Pro (conservative), QuickBot (aggressive)');
  console.log();

  // Subscribe observers to stocks
  console.log('🔔 Setting up subscriptions...\n');
  
  // Apple stock subscribers
  appleStock.subscribe(investor1);
  appleStock.subscribe(investor2);
  appleStock.subscribe(tradingBot1);
  appleStock.subscribe(tradingBot2);

  // Tesla stock subscribers
  teslaStock.subscribe(investor1);
  teslaStock.subscribe(investor3);
  teslaStock.subscribe(tradingBot1);

  // Google stock subscribers
  googleStock.subscribe(investor2);
  googleStock.subscribe(investor3);
  googleStock.subscribe(tradingBot2);

  console.log();
  console.log('=' .repeat(70));
  console.log('📊 STARTING PRICE UPDATE SIMULATION');
  console.log('=' .repeat(70));
  console.log();

  // Simulate stock price updates
  console.log('⏰ Time: Market Opening - Initial Updates\n');
  
  // Small price changes
  appleStock.updatePrice(152.50, 1100000); // +1.67% increase
  console.log('-' .repeat(50));
  
  teslaStock.updatePrice(792.00, 520000);  // -1% decrease
  console.log('-' .repeat(50));
  
  googleStock.updatePrice(2475.00, 180000); // -1% decrease
  console.log('-' .repeat(50));

  console.log('\n⏰ Time: Mid-Morning - Significant Movement\n');
  
  // Larger price changes that trigger more reactions
  appleStock.updatePrice(145.00, 1500000); // -3.33% decrease (triggers trading bots)
  console.log('-' .repeat(50));
  
  teslaStock.updatePrice(850.00, 800000);  // +6.25% increase (triggers news alerts)
  console.log('-' .repeat(50));

  console.log('\n⏰ Time: Afternoon - Major Market Event\n');
  
  // Major price movements
  googleStock.updatePrice(2750.00, 400000); // +10% increase (triggers all alerts)
  console.log('-' .repeat(50));
  
  appleStock.updatePrice(135.00, 2000000); // -10% decrease (major movement)
  console.log('-' .repeat(50));

  console.log('\n⏰ Time: Market Close - Final Updates\n');
  
  // End of day movements
  teslaStock.updatePrice(820.00, 600000);  // -3.53% from peak
  console.log('-' .repeat(50));

  // Demonstrate unsubscription
  console.log('\n🔕 Demonstrating Unsubscription...\n');
  appleStock.unsubscribe(tradingBot2);
  teslaStock.unsubscribe(investor3);

  console.log('\n📊 Final price update after unsubscriptions:\n');
  appleStock.updatePrice(140.00, 1200000); // Should not notify tradingBot2
  console.log('-' .repeat(50));
  
  teslaStock.updatePrice(810.00, 550000);  // Should not notify investor3
  console.log('-' .repeat(50));

  // Display summary statistics
  console.log();
  console.log('=' .repeat(70));
  console.log('📈 FINAL SUMMARY');
  console.log('=' .repeat(70));
  console.log();

  // Trading bot summary
  console.log('🤖 Trading Bot Activity:');
  const bot1History = tradingBot1.getTradingHistory();
  const bot2History = tradingBot2.getTradingHistory();
  console.log(`   AlgoTrader Pro: ${bot1History.length} trades executed`);
  console.log(`   QuickBot: ${bot2History.length} trades executed`);
}

/**
 * Additional demo showing error handling and edge cases
 */
function demonstrateEdgeCases(): void {
  console.log('\n' + '=' .repeat(70));
  console.log('🔍 EDGE CASES & ERROR HANDLING DEMONSTRATION');
  console.log('=' .repeat(70));
  console.log();

  const testStock = new Stock('TEST', 100.00);
  const testInvestor = new Investor('Test Investor');

  // Test duplicate subscription
  console.log('🧪 Testing duplicate subscription...');
  testStock.subscribe(testInvestor);
  testStock.subscribe(testInvestor); // Should show warning
  console.log();

  // Test unsubscribing non-existent observer
  console.log('🧪 Testing unsubscription of non-existent observer...');
  const anotherInvestor = new Investor('Another Investor');
  testStock.unsubscribe(anotherInvestor); // Should show warning
  console.log();

  // Test price update with no subscribers
  console.log('🧪 Testing stock with no subscribers...');
  const lonelyStock = new Stock('LONELY', 50.00);
  lonelyStock.updatePrice(55.00); // Should work but notify 0 observers
  console.log();

  console.log('✅ Edge case testing completed!');
}

// Run the demonstrations
// Note: In a real application, you would call these functions from your entry point
demonstrateObserverPattern();
demonstrateEdgeCases();
