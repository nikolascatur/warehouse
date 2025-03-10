import { NextRequest, NextResponse } from "next/server";
import { buyerServiceInstance } from "./service";
import { WebResponse } from "@/data/WebResponse";
import { BuyerRequest, BuyerResponse } from "@/data/BuyerData";


export async function GET(req:NextRequest): Promise<NextResponse> {
    try{
        const buyerService = buyerServiceInstance
        const buyer = await buyerService.getBuyer("")
        if(!buyer || buyer.length === 0){
            return NextResponse.json({
                success: true,
                message: 'success',
                data: [],
            }, {status: 200})
        }
        return NextResponse.json({
            success: true,
            message: 'success',
            data: buyer,
        }, {status: 200})

    }
    catch(error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error'
        }, {status: 500})
    }
    
}


export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const buyerService = buyerServiceInstance
        const {buyer_name, phone} = await req.json()
        if(!buyer_name) {
            return NextResponse.json({
                success: false,
                message: 'buyer_name is required'
            }, {status: 500})
        }

        const buyerCreate = await buyerService.createBuyer({
            buyer_name: buyer_name,
            phone: phone
        })
        return NextResponse.json({
            success: true,
            data: buyerCreate
        }, {status: 200})
    }
    catch(error) {
        return NextResponse.json({
            success: false,
            message: 'buyer_name is required'
        }, {status: 500})
    }
    
}


