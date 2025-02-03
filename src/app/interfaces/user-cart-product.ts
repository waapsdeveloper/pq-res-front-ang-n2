export interface UserCartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variations:any[] ;
}

export type CartState = Array<UserCartProduct>;
