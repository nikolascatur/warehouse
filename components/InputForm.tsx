'use client'

import React, { useState } from "react"
import { endpoint } from "@/utils/endpoint"
import { GoodsRequestData } from "@/data/GoodsData"

export const GoodsForm: React.FC = () => {

    const [formValues, setFormValues] = useState<GoodsRequestData>({
        name: "",
        price: 0,
        sellPrice: 0,
        discount: 0,
        stock: 0,
        barcode: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: (name === "discount"||name === "price" || name === "sellPrice" || name === "discount" || name === "stock")?parseInt(value):value
            ///[name]: value//name === "discount"?parseFloat(value):value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`InfoPOst ${JSON.stringify(formValues)}`)
        try {
            const response = await fetch(`${endpoint}/goods`, {
                method: "POST",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify(formValues)
                
            })
            // const data = await response.json();
            // if (data.ok) {
            //     console.log("Success Submit")
            // } else {
            //     console.log("Failed Submit")
            // }
        } catch(error) {
            console.log(`Failed Submit error ${error}`)
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-full p-6 bg-white shadow-md rounded-md'>
            <div className="mb-4">
                <label className="block text-sm text-gray-900 font-medium w-full">Nama</label>
                <input type='text' id='name' name="name" value={formValues.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm text-gray-900 font-medium">Harga</label>
                <input type='number' id='price' name="price" value={formValues.price} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm text-gray-900 font-medium">Harga Jual</label>
                <input type='number' id='sellPrice' name="sellPrice" value={formValues.sellPrice} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm text-gray-900 font-medium">Discount</label>
                <input type='number' id='discount' name="discount" value={formValues.discount} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500  text-gray-800"/>
            </div>

            <div className="mb-4">
                <label className="block text-sm text-gray-900 font-medium">Stock</label>
                <input type='number' id='stock' name="stock" value={formValues.stock} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"/>
            </div>

            <div className="mb-4">
                <label className="block text-sm text-gray-900 font-medium">Barcode</label>
                <input type='text' id='barcode' name="barcode" value={formValues.barcode} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"/>
            </div>

            <button
                type='submit'
                className="w-full rounded-md p-10 bg-green-900 text-white hover:bg-green-600 focus:ring-4 focus:ring-indigo-400"
            >
                Tambah Barang
            </button>

        </form>
    )

}