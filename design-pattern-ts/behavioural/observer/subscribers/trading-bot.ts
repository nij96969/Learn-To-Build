import { Observer } from '../interface/observer';
import { StockData } from '../interface/stock-data';
import { handleError } from '../../../utils/handleError';

/**
 * TradingBot class that implements Observer
 * Represents an automated trading system that reacts to stock price changes
 */
export class TradingBot implements Observer {
  private tradingHistory: Array<{
    symbol: string;
    action: string;
    price: number;
    timestamp: Date;
    reason: string;
  }> = [];

  constructor(
    private botName: string,
    private buyThreshold: number = -2.0, // Buy when price drops by 2% or more
    private sellThreshold: number = 3.0   // Sell when price rises by 3% or more
  ) {
    try {
      if (!botName || botName.trim() === '') {
        throw new Error('Bot name cannot be empty');
      }
      if (typeof buyThreshold !== 'number' || isNaN(buyThreshold)) {
        throw new Error('Buy threshold must be a valid number');
      }
      if (typeof sellThreshold !== 'number' || isNaN(sellThreshold)) {
        throw new Error('Sell threshold must be a valid number');
      }
      if (buyThreshold >= 0) {
        console.warn(`⚠️  Buy threshold ${buyThreshold}% is positive. Consider using negative values for price drops.`);
      }
      if (sellThreshold <= 0) {
        console.warn(`⚠️  Sell threshold ${sellThreshold}% is not positive. Consider using positive values for price rises.`);
      }

      this.botName = botName.trim();
    } catch (error) {
      throw handleError(error, 'TradingBot constructor');
    }
  }

  /**
   * Update method called when stock data changes
   * Analyzes the data and makes trading decisions
   * @param data - Stock data received from the subject
   */
  update(data: StockData): void {
    try {
      if (!data) {
        throw new Error('Stock data cannot be null or undefined');
      }
      if (!data.symbol || typeof data.price !== 'number' || typeof data.changePercent !== 'number') {
        throw new Error('Invalid stock data received');
      }

      const { symbol, price, changePercent, timestamp } = data;
      
      console.log(`🤖 ${this.botName} analyzing ${symbol}:`);
      console.log(`   📊 Current price: $${price.toFixed(2)}, Change: ${changePercent.toFixed(2)}%`);
      
      let action = 'HOLD';
      let reason = 'Price change within normal range';

      try {
        // Trading logic based on percentage change
        if (changePercent <= this.buyThreshold) {
          action = 'BUY';
          reason = `Price dropped by ${Math.abs(changePercent).toFixed(2)}% (threshold: ${Math.abs(this.buyThreshold)}%)`;
          this.executeTrade(symbol, action, price, timestamp, reason);
        } else if (changePercent >= this.sellThreshold) {
          action = 'SELL';
          reason = `Price rose by ${changePercent.toFixed(2)}% (threshold: ${this.sellThreshold}%)`;
          this.executeTrade(symbol, action, price, timestamp, reason);
        } else {
          console.log(`   ⏸️  Action: ${action} - ${reason}`);
        }
      } catch (tradeError) {
        const handledTradeError = handleError(tradeError, `Execute trade for ${symbol}`);
        console.error(`❌ Trade execution failed: ${handledTradeError.message}`);
        // Continue execution even if trade fails
      }
      
      console.log(''); // Empty line for readability
    } catch (error) {
      throw handleError(error, `${this.botName} update for ${data?.symbol || 'unknown'}`);
    }
  }

  /**
   * Execute a trade and record it in history
   * @param symbol - Stock symbol
   * @param action - Trading action (BUY/SELL)
   * @param price - Current price
   * @param timestamp - Time of the trade
   * @param reason - Reason for the trade
   */
  private executeTrade(symbol: string, action: string, price: number, timestamp: Date, reason: string): void {
    try {
      if (!symbol || symbol.trim() === '') {
        throw new Error('Symbol cannot be empty');
      }
      if (!action || !['BUY', 'SELL'].includes(action.toUpperCase())) {
        throw new Error('Action must be BUY or SELL');
      }
      if (typeof price !== 'number' || isNaN(price) || price < 0) {
        throw new Error('Price must be a non-negative number');
      }
      if (!timestamp || !(timestamp instanceof Date)) {
        throw new Error('Timestamp must be a valid Date object');
      }
      if (!reason || reason.trim() === '') {
        throw new Error('Reason cannot be empty');
      }

      const trade = {
        symbol: symbol.toUpperCase(),
        action: action.toUpperCase(),
        price,
        timestamp,
        reason: reason.trim()
      };

      this.tradingHistory.push(trade);
      
      const actionEmoji = action === 'BUY' ? '🛒' : '💰';
      console.log(`   ${actionEmoji} Action: ${action} ${symbol} at $${price.toFixed(2)}`);
      console.log(`   📝 Reason: ${reason}`);
      console.log(`   📈 Total trades executed: ${this.tradingHistory.length}`);
    } catch (error) {
      const handledError = handleError(error, `Execute trade for ${this.botName}`);
      console.error(`❌ Trade execution failed: ${handledError.message}`);
      throw handledError;
    }
  }

  /**
   * Get the bot's trading history
   * @returns Array of trading history
   */
  getTradingHistory(): Array<{symbol: string, action: string, price: number, timestamp: Date, reason: string}> {
    try {
      return [...this.tradingHistory];
    } catch (error) {
      throw handleError(error, `Get trading history for ${this.botName}`);
    }
  }
}