import { Subject } from './interface/subject';
import { Observer } from './interface/observer';
import { StockData } from './interface/stock-data';
import { handleError } from '../../utils/handleError';

/**
 * Stock class that acts as the Subject (Observable)
 * Manages a list of subscribers and notifies them when stock data changes
 */
export class Stock implements Subject {
  private observers: Observer[] = [];
  private stockData: StockData;

  constructor(
    private symbol: string,
    initialPrice: number,
    initialVolume: number = 0
  ) {
    try {
      if (!symbol || symbol.trim() === '') {
        throw new Error('Stock symbol cannot be empty');
      }
      if (initialPrice < 0) {
        throw new Error('Initial price cannot be negative');
      }
      if (initialVolume < 0) {
        throw new Error('Initial volume cannot be negative');
      }

      this.stockData = {
        symbol: symbol.toUpperCase(),
        price: initialPrice,
        change: 0,
        changePercent: 0,
        timestamp: new Date(),
        volume: initialVolume
      };
    } catch (error) {
      throw handleError(error, `Stock constructor for ${symbol}`);
    }
  }

  /**
   * Subscribe an observer to stock updates
   * @param observer - The observer to add
   */
  subscribe(observer: Observer): void {
    try {
      if (!observer) {
        throw new Error('Observer cannot be null or undefined');
      }

      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
        console.log(`📈 Observer subscribed to ${this.symbol}. Total subscribers: ${this.observers.length}`);
      } else {
        console.log(`⚠️  Observer already subscribed to ${this.symbol}`);
      }
    } catch (error) {
      const handledError = handleError(error, `Subscribe to ${this.symbol}`);
      console.error(`❌ Subscription failed: ${handledError.message}`);
      throw handledError;
    }
  }

  /**
   * Unsubscribe an observer from stock updates
   * @param observer - The observer to remove
   */
  unsubscribe(observer: Observer): void {
    try {
      if (!observer) {
        throw new Error('Observer cannot be null or undefined');
      }

      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
        console.log(`📉 Observer unsubscribed from ${this.symbol}. Remaining subscribers: ${this.observers.length}`);
      } else {
        console.log(`⚠️  Observer not found in ${this.symbol} subscribers list`);
      }
    } catch (error) {
      const handledError = handleError(error, `Unsubscribe from ${this.symbol}`);
      console.error(`❌ Unsubscription failed: ${handledError.message}`);
      throw handledError;
    }
  }

  /**
   * Notify all subscribers about stock data changes
   * @param data - The stock data to send to observers
   */
  notify(data: StockData): void {
    try {
      if (!data) {
        throw new Error('Stock data cannot be null or undefined');
      }

      console.log(`🔔 Notifying ${this.observers.length} subscribers about ${this.symbol} update`);
      
      const failedNotifications: Observer[] = [];
      
      this.observers.forEach((observer, index) => {
        try {
          observer.update(data);
        } catch (error) {
          const handledError = handleError(error, `Notify observer ${index} for ${this.symbol}`);
          console.error(`❌ Error notifying observer ${index}: ${handledError.message}`);
          failedNotifications.push(observer);
        }
      });

      // Report summary of failed notifications
      if (failedNotifications.length > 0) {
        console.warn(`⚠️  ${failedNotifications.length}/${this.observers.length} observers failed to receive notification for ${this.symbol}`);
      }
    } catch (error) {
      const handledError = handleError(error, `Notify observers for ${this.symbol}`);
      console.error(`❌ Notification failed: ${handledError.message}`);
      throw handledError;
    }
  }

  /**
   * Update stock price and notify subscribers
   * @param newPrice - The new stock price
   * @param volume - Trading volume (optional)
   */
  updatePrice(newPrice: number, volume?: number): void {
    try {
      if (typeof newPrice !== 'number' || isNaN(newPrice)) {
        throw new Error('New price must be a valid number');
      }
      if (newPrice < 0) {
        throw new Error('Stock price cannot be negative');
      }
      if (volume !== undefined && (typeof volume !== 'number' || isNaN(volume) || volume < 0)) {
        throw new Error('Volume must be a non-negative number');
      }

      const oldPrice = this.stockData.price;
      const change = newPrice - oldPrice;
      const changePercent = oldPrice > 0 ? (change / oldPrice) * 100 : 0;

      this.stockData = {
        ...this.stockData,
        price: newPrice,
        change,
        changePercent,
        timestamp: new Date(),
        volume: volume !== undefined ? volume : this.stockData.volume
      };

      console.log(`💰 ${this.symbol} price updated: $${oldPrice.toFixed(2)} → $${newPrice.toFixed(2)} (${change >= 0 ? '+' : ''}${change.toFixed(2)}, ${changePercent.toFixed(2)}%)`);
      
      // Notify all subscribers
      this.notify(this.stockData);
    } catch (error) {
      throw handleError(error, `Update price for ${this.symbol}`);
    }
  }

  /**
   * Get current stock data
   * @returns Current stock data
   */
  getCurrentData(): StockData {
    try {
      return { ...this.stockData };
    } catch (error) {
      throw handleError(error, `Get current data for ${this.symbol}`);
    }
  }
}