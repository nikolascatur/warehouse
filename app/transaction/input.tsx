"use client";

import { GoodsResponse } from "@/data/GoodsData";
import { OrderRequest } from "@/data/TransactionData";
import { useState } from "react";

type InputProp = {
  goods: GoodsResponse[]
}

export const InputTransaction: React.FC<InputProp> = (good) => {
  const [goods, setGoods] = useState<OrderRequest[]>([]);
  const [formValues, setFormValues] = useState<GoodsResponse>();
  const [count, setCount] = useState<number>(0);

  const nameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = good.goods.find((nm) => nm.name.includes(value));
    setFormValues(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (formValues) {
      const total = formValues.sellPrice * BigInt(count);
      const orderReq: OrderRequest = {
        goodId: formValues.id,
        goodName: formValues.name,
        goodCount: count,
        goodPrice: formValues.sellPrice,
        totalGoodPrice: total - total * BigInt(formValues.discount),
        barcode: formValues.barcode,
        discount: formValues.discount,
      };
      setGoods([...goods, orderReq]);
      console.log(`valuee ${goods}`)
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between align-top bg-slate-700 border-spacing-2 p-10 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-white font-medium">Nama/Kode barcode</label>
          <input
            type="text"
            id="name"
            onChange={nameOnChange}
            value={formValues?.name}
          />
          <label className="text-white font-medium">Banyak</label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => {
              if (e.target.value) {
                setCount(parseInt(e.target.value));
              }
            }}
          />
          <button type="submit" className="rounded-md bg-blue-300">
            Pesan
          </button>
        </form>
        <div className="mx-10">
          <div className="text-white text-xl font-medium">Total :</div>
          <div className="text-white text-4xl font-bold my-2">
            Rp 1000000,00
          </div>
        </div>
      </div>
    </div>
  );
};
