import { GoodsRequestData } from "@/data/GoodsData";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
import {v4 as uuid} from 'uuid'
import { goodServiceInstance } from "./service";

type ApiResponse = {
    success: boolean,
    data?:any,
    message?:string,
    error?:string
}

export async function GET(req:NextRequest): Promise<NextResponse> {

    try {
        const goodService = goodServiceInstance
        const param = req.nextUrl.searchParams.get("id") as string
        console.log(`nikoo CHEEEEKKK param ${param}`)
        const listGood = await goodService.getGoodsId(param)
        return NextResponse.json({
            success: true,
            data: listGood
        }, {status: 200})

    } catch(error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error.', error: (error as Error).message },
            { status: 500 }
          );
    }    
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    try {
            const goodId = req.nextUrl.searchParams.get("id") as string
            const deleteGoods = goodServiceInstance.deleteGoods(goodId)
            return NextResponse.json({
                success: true,
                message: 'Delete Data success',
                data: deleteGoods
            }, {status: 200})
    } catch(error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error.', error: (error as Error).message },
            { status: 500 }
          );
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body: GoodsRequestData = await req.json()
        const prismaService = new PrismaClient()
        const insertGoods = await prismaService.goods.create({
                    data: {
                        id: uuid(),
                        name: body.name,
                        price: body.price,
                        sell_price: body.sellPrice,
                        discount: body.discount,
                        stock: body.stock,
                        barcode: body.barcode
                    }
                })
                return NextResponse.json({
                    success: true,
                    message: 'insert Data Success',
                    data: [insertGoods]
                }, {status: 200})
        }
    catch(error) {
        console.log(`${error}`)
        return NextResponse.json(
            { success: false, message: 'Internal server error.', error: (error as Error).message },
            { status: 500 }
          );

    }
}
