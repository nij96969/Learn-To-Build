/**
 * Stock Data Interface
 * Represents the structure of stock information
 */
export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: Date;
  volume: number;
}