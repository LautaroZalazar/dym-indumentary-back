export interface ICartCreate {
  products: any;
  total: number;
  shipping: number;
}

export interface IAddProductToCart {
  cartId: string;
  products: IProductCart[];
}

export interface IUpdateProductInCart {
  cartId: string;
  products: IProductCart[];
}

export interface IProductCart {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface IRemoveProductFromCart {
  cartId: string;
  productId: string;
  colorId: string;
  sizeId: string;
}
