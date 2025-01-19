import { GoodsRequestData, GoodsResponse } from "@/data/GoodsData"
import { WebResponse } from "@/data/WebResponse";
import { endpoint } from "@/utils/endpoint";
import { empty } from "@prisma/client/runtime/library";
import { GoodList } from "./GoodList";


export async function getGoods(): Promise<GoodsResponse[]>{

    try {

        const response = await fetch(`${endpoint}/goods`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            cache: 'no-store'
        })
    
        if (!response.ok) {
            throw new Error('Failed to get Data')
        }
        const data: WebResponse<GoodsResponse[]> = await response.json()
        return data.data
    }catch(error) {
        throw new Error('Failed Call Data')
    }
}

export const Good = async () => {
    // const [data, setData] = useState<GoodsResponse[]>([])
    // const call: GoodsResponse[] = await getGoods()
//     useEffect(() => {
//         const response = async () => {try {

//             const response = await fetch(`${endpoint}/goods`, {
//                 method: "GET",
//                 headers: {
//                     "Content-type": "application/json"
//                 },
//                 cache: 'no-store'
//             })
        
//             if (!response.ok) {
//                 throw new Error('Failed to get Data')
//             }
//             const res: WebResponse<GoodsResponse[]> = await response.json()
//             setData(res.data)
//         }catch(error) {
//             throw new Error('Failed Call Data')
//         }
//     }
//     response()
// },[])

// return (<GoodList item={call}/>)
return (<GoodList />)


}

