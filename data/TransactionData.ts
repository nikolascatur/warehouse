export type TransactionRequest = {
  orderDate: bigint;
  lastUpdate: bigint;
  statusPayment: "hutang"|"lunas";
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
  goodPrice: bigint;
  totalGoodPrice: bigint;
  discount: number;
  barcode: string;
};

export type TransactionDb = {
  orderDetail: {
    id: string;
    goods_name: string;
    goods_count: number;
    goods_price: bigint;
    total_goods_price: bigint;
    discount: number;
    barcode: string;
  }[];
  id: string;
  order_date: bigint;
  last_update: bigint;
  payment_status: string;
  buyer_name: string;
  teller_name: string;
};

export type TransactionResponse = {
  id: string;
  orderDate: bigint;
  lastUpdate: bigint;
  paymentStatus: string;
  buyerName: string;
  tellerName: string;
  order: OrderResponse[];
};

export type OrderResponse = {
  id: string;
  goodsName: string;
  goodsCount: number;
  goodsPrice: bigint;
  totalGoodsPrice: bigint;
  discount: number;
  barcode: string;
};
