"use client";

import { useState } from "react";

export const InputTransaction: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent) => {};
  const [goods, setGoods] = useState()

  return (
    <div className="flex flex-row justify-between align-top bg-slate-700 border-spacing-2 p-10 rounded-xl">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-white font-medium">Nama/Kode barcode</label>
        <input type="text" id="name" />
        <label className="text-white font-medium">Banyak</label>
        <input type="number" id="count" />
      </form>
      <div className="mx-10">
        <div className="text-white text-xl font-medium">Total :</div>
        <div className="text-white text-4xl font-bold my-2">Rp 1000000,00</div>
      </div>
    </div>
  );
};
