export interface CashSessionSalesSummary {
  cashSessionId: number;
  totalSold: number;
  paymentMethods: CashSessionPaymentMethodTotal[];
  sales: CashSessionSale[];
}

export interface CashSessionPaymentMethodTotal {
  paymentMethod: string;
  total: number;
}

export interface CashSessionSale {
  id: number;
  saleNumber: string;
  subtotal: number;
  discount: number;
  total: number;
  createdByName?: string;
  createdAt?: string;
  items: CashSessionSaleItem[];
  payments: CashSessionSalePayment[];
}

export interface CashSessionSaleItem {
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  subtotal: number;
}

export interface CashSessionSalePayment {
  paymentMethod: string;
  amount: number;
  receivedAmount?: number;
  changeAmount?: number;
  reference?: string;
}
