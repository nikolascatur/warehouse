"use client";

import { GoodsResponse } from "@/data/GoodsData";
import { OrderRequest } from "@/data/TransactionData";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { count } from "console";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { endpoint } from "@/utils/endpoint";
import { Order } from "@prisma/client";
import { WebResponse } from "@/data/WebResponse";
import { TransactionRequest } from "@/data/TransactionData";
import { formatCurrency, toStringfy, isValideForm } from "@/lib/utils";
import { stringToNumber } from "@/lib/utils";

export const InputTransaction: React.FC = () => {
  const [goods, setGoods] = useState<OrderRequest[]>([]);
  const [formValues, setFormValues] = useState<GoodsResponse>();
  const [goodName, setGoodName] = useState<string>("");
  const [count, setCount] = useState<string>();
  const [goodReq, setGoodsReq] = useState<GoodsResponse[]>();
  const [disPesan, setDisPesan] = useState<boolean>(true)
  const [total, setTotal] = useState<string>()

  useEffect(() => {
    const data = sessionStorage.getItem("goods");
    console.log(`VALUUUUUUEEEEE ${data}`);
    if (data) {
      try {
        const saveData: OrderRequest[] = JSON.parse(data ?? "");
        console.log(`SAVEDATAAAAAAAAAAAA ${saveData} type ${typeof saveData}`);
        // setGoods(data?JSON.parse(data):[]);
      } catch (error) {
        console.log(`printt error ${error}`);
      }
    }
  }, []);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => open!);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [goodName]);

  const nameOnChange = (value: string) => {
    const data = goodReq?.find((nm) => nm.name == value);
    console.log(`nikooo AAAAAA ${JSON.stringify(data)} value ${value}`);
    setFormValues(data);
    setGoodName(value);
    setDisPesan(!isValideForm(formValues?.name, count?.toString()))
  };

  useEffect(() => {
    if (goodName.length > 0 && goodName.length % 2 == 0) {
      const goodFetcher = async () => {
        const req = await fetch(`${endpoint}/goods?id=${goodName}`);
        const result: WebResponse<GoodsResponse[]> = await req.json();
        setGoodsReq(result.data);
      };
      goodFetcher();
    } else {
      if(goodName.length == 0) {
        setGoodsReq([]);
      }
    }
  }, [goodName]);

  const calculateTotal = () => {
    let total = BigInt(0)
    goods.map(good => {
      const count = BigInt(good.goodCount)
      const discount = good.goodPrice * (BigInt(good.discount) / BigInt(100))
      total += (good.goodPrice - discount) * count
    })
    const currency = formatCurrency(Number(total))
    setTotal(currency)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues) {
      const countConv = BigInt(count ?? 0);
      const total = BigInt(formValues.sellPrice) * countConv;
      console.log(typeof formValues.sellPrice, formValues.sellPrice);
      const orderReq: OrderRequest = {
        goodId: formValues.id,
        goodName: formValues.name,
        goodCount: stringToNumber(count),
        goodPrice: formValues.sellPrice,
        totalGoodPrice: total - total * BigInt(formValues.discount),
        barcode: formValues.barcode,
        discount: formValues.discount,
      };
      setGoods([...goods, orderReq]);
      setFormValues(undefined);
      const jsonString = toStringfy([...goods])
      setGoodName("");
      sessionStorage.setItem("goods", jsonString);
      setCount(undefined);
      calculateTotal()
    }
  };

  const onSubmitTransaction = async () => {
      const transaction: TransactionRequest = {
          orderDate: BigInt(Date.now()),
          lastUpdate: BigInt(Date.now()),
          statusPayment: "lunas",
          buyerId: "",
          buyerName: "",
          tellerId: "",
          tellerName: "",
          order: goods,        
      } 
      const req = await fetch(`${endpoint}/transaction`, {
        method: "POST", 
        headers: {
          "content-type": "application/json"
        },
        body: toStringfy(transaction)
      })
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between align-top bg-slate-700 border-spacing-2 p-10 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-white font-medium">Nama/Kode barcode</label>
          <Command>
            <CommandInput
              value={goodName}
              onValueChange={setGoodName}
              placeholder="Masukkan Nama Barang"
            />
            <CommandList>
              <CommandEmpty>Barang Tidak di temukan</CommandEmpty>
              <CommandGroup heading="Saran Barang">
                {goodReq?.map((barang) => (
                  <CommandItem
                    key={barang.index + "suggestion"}
                    onSelect={() => nameOnChange(barang.name)}
                  >
                    {barang.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <label className="text-white font-medium">Banyak</label>
          <input
            type="number"
            className="rounded-md"
            autoComplete="new-password"
            id="count"
            value={count ?? ""}
            onChange={(e) => {
              // if (e.target.value) {
                const number = parseInt(e.target.value)
                setCount(e.target.value??"");
                setDisPesan(!isValideForm(formValues?.name, number.toString()))
              // }
            }}
          />
          <button type="submit" className="rounded-md bg-blue-300 mt-2 disabled:opacity-50" disabled={disPesan}>
            Pesan
          </button>
        </form>
        <div className="mx-10">
          <div className="text-white text-xl font-medium">Total :</div>
          <div className="text-white text-4xl font-bold my-2">
            {total}
          </div>
        </div>
      </div>
      {goods?.map((it, index) => (
        <div className="grid grid-cols-4" key={index}>
          <div key={index + "name"}>{it.goodName}</div>
          <div key={index + "price"}>{it.goodPrice}</div>
          <div key={index + "count"}>{it.goodCount}</div>
          <div key={index + "total"}>{it.totalGoodPrice}</div>
        </div>
      ))}
      <button onClick={onSubmitTransaction}>Submit</button>
    </div>
  );
};
