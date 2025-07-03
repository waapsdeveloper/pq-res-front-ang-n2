export interface OrderCharges {
  tips?: number;
  tips_amount?: number;
  delivery_charges?: number;
  tax_percentage?: number;
  tax_amount?: number;
  recalculate_total?: boolean;
}

export interface OrderSummary {
  order_number: string;
  subtotal: number;
  discount: number;
  tax_percentage: number;
  tax_amount: number;
  delivery_charges: number;
  tips: number;
  tips_amount: number;
  final_total: number;
  breakdown: {
    subtotal: number;
    discount: number;
    tax: number;
    delivery: number;
    tips: number;
    total: number;
  };
} 