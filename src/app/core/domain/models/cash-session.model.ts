export interface CashSessionModel {
  id: number;
  cashRegisterId: number;
  openedBy?: number;
  openedByName?: string;
  openedAt?: string;
  openingAmount: number;
  closedBy?: number;
  closedByName?: string;
  closedAt?: string;
  expectedAmount?: number;
  closingAmount?: number;
  difference?: number;
  status: 'OPEN' | 'CLOSED';
  openingComment?: string;
  closingComment?: string;
  deleted?: boolean;
}
