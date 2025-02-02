'use client'
import { GoodsResponse } from "@/data/GoodsData"
import { WebResponse } from "@/data/WebResponse";
import { endpoint } from "@/utils/endpoint";
import useSWR from "swr";
import { useState } from "react";
import { DialogForm } from "@/app/goods/dialog";
import { GoodsRequestData } from "@/data/GoodsData";

export const GoodList:React.FC = () => {
const fetcher = async (url: string): Promise<WebResponse<GoodsResponse[]>> => {
        const res = await fetch(url)
        const ret: WebResponse<GoodsResponse[]> = await res.json()
        return ret
}
    const {data, mutate} = useSWR(`${endpoint}/goods?id=`, fetcher)
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const handleDelete = async (id: string) => {
        await fetch(`${endpoint}/goods?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            cache: 'no-store',
        })
        mutate()
    }
    const handleSubmit = async (formValues: GoodsRequestData) => {
                console.log(`InfoPOst ${JSON.stringify(formValues)}`)
                try {
                    const response = await fetch(`${endpoint}/goods`, {
                        method: "POST",
                        headers: {
                            "Content-type":"application/json",
                        },
                        body: JSON.stringify(formValues)
                        
                    })
                    mutate();
                } catch(error) {
                    console.log(`Failed Submit error ${error}`)
                }
                
            }
    return(
        <div>
        <div className="grid grid-flow-row">
                <div className="grid grid-flow-col grid-cols-7" key="title">
                    <div className="border-solid border-2 flex justify-center font-bold bg-slate-500" key="No">No</div>
                    <div className="border-solid border-2 flex justify-center font-bold bg-slate-500" key="Nama Barang">Nama Barang</div>
                    <div className="border-solid border-2 flex justify-center font-bold bg-slate-500" key="Harga">Harga</div>
                    <div className="border-solid border-2 flex justify-center font-bold bg-slate-500" key="Harga Jual">Harga Jual</div>
                    <div className="border-solid border-2 flex justify-center font-bold bg-slate-500" key="Diskon">Diskon</div>
                    <div className="border-solid border-2 flex justify-center font-bold bg-slate-500" key="Stock">Stock</div>
                    <div className="border-solid border-2 flex justify-center font-bold bg-slate-500" key="Action">Action</div>
                </div>
                {
                    data?.data.map((it) => 
                    <div className="grid grid-flow-col grid-cols-7" key={it.id}>
                        <div className="border-solid border-2 flex justify-center font-thin" key={it.id+1}>{it.index}</div>
                        <div className="border-solid border-2 flex justify-center font-thin" key={it.id+2}>{it.name}</div>
                        <div className="border-solid border-2 flex justify-center font-thin" key={it.id+3}>{it.price}</div>
                        <div className="border-solid border-2 flex justify-center font-thin" key={it.id+4}>{it.sellPrice}</div>
                        <div className="border-solid border-2 flex justify-center font-thin" key={it.id+5}>{it.discount}</div>
                        <div className="border-solid border-2 flex justify-center font-thin" key={it.id+6}>{it.stock}</div>
                        <div className="border-solid border-2 flex justify-center font-thin" key={it.id+7}>
                            <button key={`button_${it.id}`} onClick={() =>handleDelete(it.id)}>Delete</button>
                            </div>
                    </div>)
                }
            </div>
            <div className="flex flex-row w-full justify-center">
                <button key={"button_add_good"} onClick={() => setIsOpenDialog(true)}>Tambah Barang</button>
                    <DialogForm isOpen={isOpenDialog} onOpenChange={setIsOpenDialog} onClose={() => setIsOpenDialog(false)} onSubmit={handleSubmit}/>
            </div>

        </div>
        
    )

}