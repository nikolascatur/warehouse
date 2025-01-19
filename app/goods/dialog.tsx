import { GoodsForm } from "@/components/InputForm";
import { GoodsRequestData } from "@/data/GoodsData";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {Cross2Icon} from "@radix-ui/react-icons"
import React from "react";

interface DialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
    onSubmit: (data: GoodsRequestData) => void;
}

export const DialogForm: React.FC<DialogProps> = ({isOpen, onOpenChange, onClose, onSubmit}) => {

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
            }));            
        };
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            console.log(`InfoPOst ${JSON.stringify(formValues)}`)
            setFormValues({
                name: "",
                price: 0,
                sellPrice: 0,
                discount: 0,
                stock: 0,
                barcode: ""
            })
            onSubmit(formValues)
            onClose()
        }

    if (!isOpen) return null;


    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
            <DialogPrimitive.DialogOverlay className="fixed inset-0 bg-black/50 z-40 transition-opacity"/>
            <DialogPrimitive.Content className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-md">
            <DialogPrimitive.Close  asChild>
                <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" aria-label="Close">
                    <Cross2Icon />
                </button>
            </DialogPrimitive.Close>
            <DialogPrimitive.Title className="text-xl font-semibold">
          Input Barang
        </DialogPrimitive.Title>
            <div className="m-4">
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
            </div>

            </DialogPrimitive.Content>
        </DialogPrimitive.Root>
    )
}