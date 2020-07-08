export interface Order {
    id?: number;
    userName: string;
    userPhone: string;
    userAddress?: string;
    orderPrice: number;
    shippingRate: string;
    totalPrice: number;
    productsId: number[];
}
