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
import { Buyer, Order } from "@prisma/client";
import { WebResponse } from "@/data/WebResponse";
import { TransactionRequest } from "@/data/TransactionData";
import { formatCurrency, toStringfy, isValideForm } from "@/lib/utils";
import { stringToNumber } from "@/lib/utils";
import clsx from "clsx";
import { InputSuggestionBuyer } from "@/components/InputSuggestion";
import { BuyerRequest, BuyerResponse } from "@/data/BuyerData";
import { DialogBuyer } from "./DialogBuyer";

export const InputTransaction: React.FC = () => {
  const [goods, setGoods] = useState<OrderRequest[]>([]);
  const [formValues, setFormValues] = useState<GoodsResponse>();
  const [goodName, setGoodName] = useState<string>("");
  const [count, setCount] = useState<string>();
  const [goodReq, setGoodsReq] = useState<GoodsResponse[]>();
  const [disPesan, setDisPesan] = useState<boolean>(true);
  const [total, setTotal] = useState<string>();
  const [isHintHidden, setIsHintHidden] = useState<boolean>(true);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [custSelected, setCustSelected] = useState<BuyerResponse>();

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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [goodName]);

  const nameOnChange = (value: GoodsResponse, name: string) => {
    setFormValues(value);
    setGoodName(`${value.name} (${value.weight}) gram`);
    setDisPesan(!isValideForm(formValues?.name, count?.toString()));
    setIsHintHidden(name.length == 0);
  };

  useEffect(() => {
    if (goodName.length > 0 && goodName.length % 2 == 0) {
      const goodFetcher = async () => {
        const req = await fetch(`${endpoint}/goods?id=${goodName}`);
        const result: WebResponse<GoodsResponse[]> = await req.json();
        setGoodsReq(result.data);
        setIsHintHidden(result.data.length == 0);
      };
      goodFetcher();
    } else {
      if (goodName.length == 0) {
        setGoodsReq([]);
        setIsHintHidden(true);
      }
    }
  }, [goodName]);

  useEffect(() => {
    calculateTotal();
  }, [goods]);

  const calculateTotal = () => {
    let total = BigInt(0);
    goods.forEach((good) => {
      const count = BigInt(good.goodCount);
      const discoountNum = Number(good.discount);
      const disc = BigInt((discoountNum / 100) * 1000);
      // const discount = good.goodPrice * BigInt
      // console.log(`countt--- ${((good.goodPrice - discount) * count)}`)
      const price = BigInt(good.goodPrice);
      total = total + price * count;
    });
    console.log(`count-- TOTAL = ${total}`);
    const currency = formatCurrency(Number(total));
    setTotal(currency);
  };

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
      const jsonString = toStringfy([...goods]);
      setGoodName("");
      sessionStorage.setItem("goods", jsonString);
      setCount(undefined);
      setIsHintHidden(true);
    }
  };

  const onSubmitTransaction = async () => {
    const transaction: TransactionRequest = {
      orderDate: BigInt(Date.now()),
      lastUpdate: BigInt(Date.now()),
      statusPayment: "lunas",
      buyerId: custSelected?.id ?? "",
      buyerName: custSelected?.buyer_name ?? "",
      tellerId: "",
      tellerName: "",
      order: goods,
    };
    const req = await fetch(`${endpoint}/transaction`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: toStringfy(transaction),
    });
    setGoods([]);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 justify-between align-top bg-slate-700 border-spacing-2 p-10 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-white font-medium">Nama/Kode barcode</label>
          <Command className="min-w-max">
            <CommandInput
              className="min-w-max"
              value={goodName}
              onValueChange={setGoodName}
              placeholder="Masukkan Nama Barang"
            />
            <CommandList className="absolute my-10 bg-slate-800 rounded-lg z-10">
              <CommandEmpty hidden={true}></CommandEmpty>
              <CommandGroup hidden={isHintHidden}>
                {goodReq?.map((barang) => (
                  <CommandItem
                    className="text-white"
                    key={barang.index + "suggestion"}
                    onKeyDown={() => {
                      nameOnChange(barang, barang.name);
                      setGoodsReq([]);
                    }}
                    onSelect={() => {
                      nameOnChange(barang, barang.name);
                      setGoodsReq([]);
                    }}
                  >
                    {`${barang.name} (${barang.weight}) gram`}
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
              const number = parseInt(e.target.value);
              setCount(e.target.value ?? "");
              setDisPesan(!isValideForm(formValues?.name, number.toString()));
            }}
          />
          <button
            type="submit"
            className="rounded-md bg-blue-300 mt-2 disabled:opacity-50"
            disabled={disPesan}
          >
            Pesan
          </button>
        </form>
        <div className="mx-10">
          <div className="text-white text-xl font-medium">Total :</div>
          <div className="text-white text-4xl font-bold my-2">{total}</div>
        </div>
      </div>
      <div className="flex flex-row">
        <button onClick={() => setIsOpenDialog(true)}>Nama Pembeli : </button>
        <div className="px-2">
          {`${custSelected?.buyer_name ?? ""} ${custSelected?.phone ?? ""}`}
        </div>
      </div>
      <div className="grid grid-cols-4 border-solid border-2 place-items-center rounded-tl-lg rounded-tr-lg">
        <div>Nama</div>
        <div>Harga</div>
        <div>Banyak</div>
        <div>Sub Total</div>
      </div>
      {goods?.map((it, index) => (
        <div
          className="grid grid-cols-4 place-items-center border-l-2 border-r-2"
          key={index}
        >
          <div key={index + "name"}>{it.goodName}</div>
          <div key={index + "price"}>{it.goodPrice}</div>
          <div key={index + "count"}>{it.goodCount}</div>
          <div key={index + "total"}>{it.totalGoodPrice}</div>
        </div>
      ))}
      <div className="border-b-2 rounded-bl-lg rounded-br-lg"></div>
      <button
        className={clsx(
          "rounded-md bg-blue-300 mt-2 disabled:opacity-50 disabled:text-gray-50"
        )}
        disabled={goods.length == 0}
        onClick={onSubmitTransaction}
      >
        Submit
      </button>
      <DialogBuyer
        isOpen={isOpenDialog}
        onOpenChange={setIsOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        onSubmit={(data) => setCustSelected(data)}
      />
    </div>
  );
};
