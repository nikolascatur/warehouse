import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { buyerServiceInstance } from "../service";


export async function GET(req:NextRequest): Promise<NextResponse> {

    try {
        const buyerService = buyerServiceInstance
        const param = req.nextUrl.searchParams.get("name")
        if(!param) {
            return NextResponse.json({
                success: false,
                message: "name is empty",
                error: 500,
            },{status: 500})
        }
        const data = await buyerService.getBuyer(param)
        return NextResponse.json({
            success: true,
            message: "Success",
            data: data
        }, {status: 200})

    } catch(error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: 500,
        },{status: 500})
    }
    
}