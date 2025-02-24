import { BuyerRequest, BuyerResponse } from "@/data/BuyerData";
import { Buyer, PrismaClient } from "@prisma/client";
import {v4 as uuid} from "uuid";



class BuyerService {

    constructor(private prismaClient: PrismaClient){}

    private static _instance: BuyerService;

    public static get Instance(){
        return this._instance || (this._instance = new this(new PrismaClient()))
    }

    toBuyer(response: Buyer): BuyerResponse {
        return {
            id: response.id,
            buyer_name: response.buyer_name,
            phone: response.phone??""
        }
    }

    async createBuyer(request: BuyerRequest): Promise<BuyerResponse>{
        const buyer =  await this.prismaClient.buyer.create({
            data: {
                id: uuid().toString(),
                buyer_name: request.buyer_name,
                phone: request.phone
            }
        })

        return {
            id: buyer.id,
            buyer_name: buyer.buyer_name,
            phone: buyer.phone??""
        }
    }

    async getBuyer(name: string): Promise<BuyerResponse[]> {
        const findBuyer = await this.prismaClient.buyer.findMany({
            where: {
                id: {
                    contains: name
                }
            }
        })

        return findBuyer.map((mp) => this.toBuyer(mp))
    }
}

export const buyerServiceInstance = BuyerService.Instance