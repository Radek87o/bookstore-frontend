export interface OrderResponse {
    id: string;
    orderTrackingNumber: string;
    totalQuantity: number;
    totalPrice: number;
    creationDate: Date;
    lastUpdated: Date;
}
