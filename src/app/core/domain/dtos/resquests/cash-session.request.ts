export interface CashSessionOpenRequest {
  cashRegisterId: number;
  openingAmount: number;
  openingComment?: string;
}

export interface CashSessionCloseRequest {
  closingAmount: number;
  closingComment?: string;
}
