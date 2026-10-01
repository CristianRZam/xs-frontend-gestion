export interface DailySalesResponse {
  date: string;
  total: number;
}

export interface ProductSalesResponse {
  productId: number;
  productName: string;
  quantity: number;
}

export interface PaymentMethodResponse {
  method: string;
  total: number;
}

export interface DashboardResponse {
  scope: 'GLOBAL' | 'PERSONAL';
  summaryDate: string;
  todaySalesCount: number;
  averageSale: number;
  todaySales: number;
  todayOrders: number;
  weeklySales: DailySalesResponse[];
  topProducts: ProductSalesResponse[];
  paymentMethods: PaymentMethodResponse[];
}
