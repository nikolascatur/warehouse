import { TransactionRequest } from "@/data/TransactionData";
import { NextRequest, NextResponse } from "next/server";
import { transactionServiceInstance } from "./service";


export async function POST(req: NextRequest): Promise<NextResponse> {
    try{
        const body: TransactionRequest = await req.json()
        const transaction  = transactionServiceInstance
        const insert = transaction.createTransaction(body)
        return NextResponse.json({
            success: true,
            data: insert
        }, {status: 200})

    }
    catch(error){

        return NextResponse.json({
            succes: false,
            message: 'Internal server error',
            error: (error as Error).message
        }, {status: 500})
    }
    
}