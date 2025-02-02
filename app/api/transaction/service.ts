import { OrderRequest, TransactionDb, TransactionRequest, TransactionResponse } from "@/data/TransactionData";
import { Order, PrismaClient, Transaction } from "@prisma/client";
import {v4 as uuid} from 'uuid'


class TransactionService{
    constructor(
        private prismaClient: PrismaClient
    ){}

    private static _instance: TransactionService

    public static get Instance() {
        return this._instance || (this._instance = new this(new PrismaClient()))
    }

    toTransactionResponse(request: TransactionDb): TransactionResponse {
        return {
            idTransaction: request.id,
            createdAt: request.created_ar,
            lastUpdate: request.last_update,
            statusPayment: request.status_payment,
            order: request.order.map((order) => {
                return {
                    orderId: order.id,
                    goodId: order.goods.id,
                    goodName: order.goods.name,
                    countOrder: order.count_good,
                    priceItem: order.price_item,
                    priceTotal: order.price_total,
                    discount: order.price_total
                }

            })
        }

    }

    async createTransaction(request: TransactionRequest): Promise<TransactionResponse> {
        const insert = await this.prismaClient.transaction.create({
            data: {
                id: uuid(),
                created_ar: Date(),
                last_update: Date(),
                status_payment: request.statusPayment,
                order: {
                    create: request.order.map((order: OrderRequest) => {
                        return {
                            id: uuid(),
                            goods_id: order.idGood,
                            count_good: order.count,
                            price_item: order.priceItem,
                            discount: order.discount,
                            price_total: (order.count*order.priceItem)-((order.count*order.priceItem)*(order.discount/100))
                        }
                    })
                }
            },select: {
                id: true,
                created_ar: true,
                last_update: true,
                status_payment: true,
                order: {
                    select: {
                        id: true,
                        count_good: true,
                        price_item: true,
                        price_total: true,
                        discount: true,
                        goods: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }

                }
            }
        })
        return this.toTransactionResponse(insert)        
    }
}

export const transactionServiceInstance = TransactionService.Instance
