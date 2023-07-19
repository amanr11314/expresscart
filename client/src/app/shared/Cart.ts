export interface Cart {
    cartProducts?: (CartProductsEntity)[] | null;
    totaAmount: number;
}
export interface CartProductsEntity {
    id: string; // actual product id 
    title: string;
    description: string;
    price: number;
    imgUrl: string;
    createdAt: string;
    updatedAt: string;
    UserId?: null;
    CartItem: CartItem;
}
export interface CartItem {
    id: number; // unique cart item id
    quantity: number;
    createdAt: string;
    updatedAt: string;
    CartId: string;
    ProductId: string;
}
