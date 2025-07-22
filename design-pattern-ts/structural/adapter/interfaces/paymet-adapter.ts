export interface IPaymentAdapter {
  pay(amount: number): void;
}