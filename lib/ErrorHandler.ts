import { NextResponse } from "next/server"


export const ErrorHandlerApi = async (error: Error) => {

    return NextResponse.json({
        success: false,
        message: 'Internal Server Error',
        error: (error as Error).message
    },{status: 500})

}