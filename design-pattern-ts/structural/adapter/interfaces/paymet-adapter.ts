export interface IPaymentAdapter {
  pay(amount: number, currency: string): void;
}