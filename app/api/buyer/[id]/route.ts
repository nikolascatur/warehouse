import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { buyerServiceInstance } from "../service";


export async function GET(req:NextRequest): Promise<NextResponse> {

    try {
        const buyerService = buyerServiceInstance
        const param = req.nextUrl.searchParams.get("name")
        console.log(`checcck GET BUYERRRR ${param}`)
        if(!param) {
            return NextResponse.json({
                success: false,
                message: "name is empty",
                data: null,
                error: 500,
            },{status: 500})
        }
        const data = await buyerService.getBuyer(param)
        if (!data || data.length === 0) {
            return NextResponse.json({
                success: true,
                message: "Success",
                data: []
            }, {status: 200})
        }
        return NextResponse.json({
            success: true,
            message: "Success",
            data: data
        }, {status: 200})

    } catch(error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: 500,
        },{status: 500})
    }
    
}