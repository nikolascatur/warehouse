
export type TransactionRequest = {
    statusPayment: string,
    order: OrderRequest[]

}

export type TransactionDb = {
        order: {
            goods: {
                name: string;
                id: string;
            };
            id: string;
            count_good: number;
            price_item: number;
            price_total: number;
            discount: number;
        }[];
        id: string;
        created_ar: Date;
        last_update: Date;
        status_payment: string;
}



export type OrderRequest = {
    idGood: string, 
    count: number,
    priceItem: number,
    discount: number
}

export type TransactionResponse = {
    idTransaction: string,
    createdAt: Date,
    lastUpdate: Date,
    statusPayment: string,
    order: OrderResponse[]
}

export type OrderResponse = {
    orderId: string,
    goodId: string,
    goodName: string,
    countOrder: number,
    priceItem: number,
    priceTotal: number,
    discount: number
}