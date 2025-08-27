import { Observer } from '../interface/observer';
import { StockData } from '../interface/stock-data';
import { handleError } from '../../../utils/handleError';

/**
 * Investor class that implements Observer
 * Represents an individual investor who subscribes to stock updates
 */
export class Investor implements Observer {
  constructor(private name: string) {
    try {
      if (!name || name.trim() === '') {
        throw new Error('Investor name cannot be empty');
      }
      this.name = name.trim();
    } catch (error) {
      throw handleError(error, 'Investor constructor');
    }
  }

  /**
   * Update method called when stock data changes
   * @param data - Stock data received from the subject
   */
  update(data: StockData): void {
    try {
      if (!data) {
        throw new Error('Stock data cannot be null or undefined');
      }
      if (!data.symbol || !data.price || data.timestamp === undefined) {
        throw new Error('Invalid stock data received');
      }

      const { symbol, price, change, changePercent, timestamp } = data;
      const direction = change >= 0 ? '📈' : '📉';
      const changeStr = change >= 0 ? `+$${change.toFixed(2)}` : `-$${Math.abs(change).toFixed(2)}`;
      
      console.log(`👤 ${this.name} received update for ${symbol}:`);
      console.log(`   ${direction} Price: $${price.toFixed(2)} (${changeStr}, ${changePercent.toFixed(2)}%)`);
      console.log(`   ⏰ Time: ${timestamp.toLocaleTimeString()}`);
      console.log(''); // Empty line for readability
    } catch (error) {
      throw handleError(error, `Investor ${this.name} update`);
    }
  }
}