export interface Order {
    id?: number;
    userName: string;
    userPhone: string;
    userAddress?: string;
    orderPrice: number;
    shipping: number;
    productsId: number[];
}
