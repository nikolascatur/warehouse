import { BuyerResponse, BuyerRequest } from "@/data/BuyerData";
import { InputSuggestionBuyer } from "@/components/InputSuggestion";
import React, { useState, useEffect } from "react";
import { endpoint } from "@/utils/endpoint";
import { toStringfy } from "@/lib/utils";
import { WebResponse } from "@/data/WebResponse";
import { Input } from "postcss";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DialogBuyerProp {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onSubmit: (data: BuyerResponse) => void;
}

export const DialogBuyer: React.FC<DialogBuyerProp> = ({
  isOpen,
  onOpenChange,
  onClose,
  onSubmit,
}) => {
  const [custName, setCustName] = useState<string>("");
  const [custSuggest, setCustSuggest] = useState<BuyerResponse[]>([]);
  const [custSelected, setCustSelected] = useState<BuyerResponse>();
  const [isHintHidden, setIsHintHidden] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>("");

  const saveCustomer = async () => {
    console.log(`customerName ${custName}`);
    if (custName.length > 0) {
      const custRequest: BuyerRequest = {
        buyer_name: custName,
        phone: "",
      };
      const req = await fetch(`${endpoint}/buyer`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: toStringfy(custRequest),
      });
      const byer: BuyerResponse = await req.json();
      setCustSelected(byer);
    }
  };

  useEffect(() => {
    if (custName.length > 0) {
      const custNameFetcher = async () => {
        const fetcher = await fetch(`${endpoint}/buyer?name=${custName}`);
        // const result = await fetcher.json();

        const result: WebResponse<BuyerResponse[] | null> =
          await fetcher.json();
        if (result.data) {
          setCustSuggest(result.data);
          setIsHintHidden(result.data.length == 0);
        }
      };
      custNameFetcher();
    }
  }, [custName]);

  const custChangeName = (value: BuyerResponse | null, name: string) => {
    if (value) {
      setCustSelected(value);
    }
    setCustName(name);
    console.log(`AAAAAAAA  ${name} ${custName}`);
    setIsHintHidden(name.length == 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(` check ${custSelected}  name ${custName} phone ${phone}`);
    if (custSelected == undefined && custName.length > 0) {
      saveCustomer();
    }
    if (custSelected != undefined) {
      onSubmit(custSelected);
      onClose();
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.DialogOverlay className="fixed inset-0 bg-black/50 z-40 transition-opacity" />
      <DialogPrimitive.Content className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-md">
        <DialogPrimitive.Close asChild>
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </DialogPrimitive.Close>
        <DialogPrimitive.Title className="text-xl font-semibold">
          Masukan Nama Pemesan
        </DialogPrimitive.Title>
        <div className="flex flex-col">
          <label className="text-white font-medium">Nama Pemesan</label>
          <InputSuggestionBuyer
            isHidenSuggestion={isHintHidden}
            suggestionItem={custSuggest}
            nameOnChange={(buyer, name) => custChangeName(buyer, name)}
            setName={(buyer) => setCustSuggest(buyer)}
          />
          <label>No Telp</label>
          <input
            type="text"
            value={phone}
            onChange={(ph) => setPhone(ph.target.value)}
          ></input>
          <button type="submit" onClick={handleSubmit}>
            Pilih
          </button>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
};
