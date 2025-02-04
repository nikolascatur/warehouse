export type TransactionRequest = {
  orderDate: number;
  lastUpdate: number;
  statusPayment: string;
  buyerId: string;
  buyerName: string;
  tellerId: string;
  tellerName: string;
  order: OrderRequest[];
};

export type OrderRequest = {
  goodId: string;
  goodName: string;
  goodCount: number;
  goodPrice: number;
  totalGoodPrice: number;
  discount: number;
  barcode: string;
};

export type TransactionDb = {
  orderDetail: {
    id: string;
    goods_name: string;
    goods_count: number;
    goods_price: number;
    total_goods_price: number;
    discount: number;
    barcode: string;
  }[];
  id: string;
  order_date: number;
  last_update: number;
  payment_status: string;
  buyer_name: string;
  teller_name: string;
};

export type TransactionResponse = {
  id: string;
  orderDate: number;
  lastUpdate: number;
  paymentStatus: string;
  buyerName: string;
  tellerName: string;
  order: OrderResponse[];
};

export type OrderResponse = {
  id: string;
  goodsName: string;
  goodsCount: number;
  goodsPrice: number;
  totalGoodsPrice: number;
  discount: number;
  barcode: string;
};
