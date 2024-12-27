export interface UserCartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type CartState = Array<UserCartProduct>;
