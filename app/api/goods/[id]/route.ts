import { NextRequest, NextResponse } from "next/server";
import { goodServiceInstance } from "../service";
import { WebResponse } from "@/data/WebResponse";
import { GoodsResponse } from "@/data/GoodsData";


export async function GET(req: NextRequest): Promise<NextResponse> {

    try{
        const goodService = goodServiceInstance
        const id = req.nextUrl.searchParams.get("id")
        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'id is requeired'
            }, {status:500})
        }
        const result = await goodService.getGoodsId(id)
        return NextResponse.json({
            success: true,
            data: result,
            message: 'success'
        }, {status: 200})
        
    }
    catch(error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, {status:500})

    }
}