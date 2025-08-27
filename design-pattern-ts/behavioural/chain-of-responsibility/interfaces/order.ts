/**
 * Order item structure
 */
export interface OrderItem {
  id: string;
  qty: number;
}

/**
 * Payment information
 */
export interface PaymentInfo {
  status: string;
}

/**
 * Order request structure
 */
export interface OrderRequest {
  userId?: number;
  items?: OrderItem[];
  payment?: PaymentInfo;
  amount: number;
}
