import {
  OrderRequest,
  TransactionDb,
  TransactionRequest,
  TransactionResponse,
} from "@/data/TransactionData";
import { Order, OrderDetail, PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

class TransactionService {
  constructor(private prismaClient: PrismaClient) {}

  private static _instance: TransactionService;

  public static get Instance() {
    return this._instance || (this._instance = new this(new PrismaClient()));
  }

  toTransactionResponse(request: TransactionDb): TransactionResponse {
    return {
      id: request.id,
      orderDate: request.order_date,
      lastUpdate: request.last_update,
      paymentStatus: request.payment_status,
      buyerName: request.buyer_name,
      tellerName: request.teller_name,
      order: request.orderDetail.map((or) => {
        return {
          id: or.id,
          goodsName: or.goods_name,
          goodsCount: or.goods_count,
          goodsPrice: or.goods_price,
          totalGoodsPrice: or.total_goods_price,
          discount: or.discount,
          barcode: or.barcode,
        };
      }),
    };
  }

  async createTransaction(
    request: TransactionRequest
  ): Promise<TransactionResponse> {
    const insert = await this.prismaClient.order.create({
      data: {
        id: uuid(),
        order_date: request.orderDate,
        last_update: request.lastUpdate,
        payment_status: request.statusPayment,
        buyer_id: request.buyerId,
        buyer_name: request.buyerName,
        teller_id: request.tellerId,
        teller_name: request.tellerName,
        orderDetail: {
          create: request.order.map((detail: OrderRequest) => {
            return {
              id: uuid(),
              goods_id: detail.goodId,
              goods_name: detail.goodName,
              goods_count: detail.goodCount,
              goods_price: detail.goodPrice,
              total_goods_price: detail.totalGoodPrice,
              discount: detail.discount,
              barcode: detail.barcode,
            };
          }),
        },
      },
      select: {
        id: true,
        order_date: true,
        last_update: true,
        payment_status: true,
        buyer_name: true,
        teller_name: true,
        orderDetail: {
          select: {
            id: true,
            goods_name: true,
            goods_count: true,
            goods_price: true,
            total_goods_price: true,
            discount: true,
            barcode: true,
          },
        },
      },
    });

    return this.toTransactionResponse(insert)
  }
}

export const transactionServiceInstance = TransactionService.Instance;
