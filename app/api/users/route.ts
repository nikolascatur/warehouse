import {Router, Request, Response} from "express"
import DBWrapper from "../../server";
import { NextResponse } from "next/server";

const router = Router()

export async function GET() {
    

        const query = `Select * from Users`;
        DBWrapper.executeQuery(query, (err: any, users: Object[]) => {
            if (err) {
                return NextResponse.json({ok: true,users})
            } else {
                return NextResponse.json({ok: false, err})
            }

        })
    
}

// router.get('/users', (req: Request, res: Response) => {

//     console.log("get userssssss -----")

//     const query = `Select * from Users`;

//     DBWrapper.executeQuery(query, (err: any, users: Object[]) => {
//         if (err) {
//             res.status(400).json({ok: false, err})
//         } else {
//             res.json({
//                 ok: true,
//                 users
//             })
//         }

//     })

// }) 