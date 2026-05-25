export interface ISaleItem {
  variantId: string;
  quantity: number;
}

export interface IPaymentEntry {
  method: 'cash' | 'debit' | 'credit' | 'transfer';
  amount: number;
}

export interface IDiscount {
  type: 'percentage' | 'fixed';
  value: number;
}

export interface ICreateSale {
  customerId: string;
  items: ISaleItem[];
  paymentMethods: IPaymentEntry[];
  discount?: IDiscount;
}
