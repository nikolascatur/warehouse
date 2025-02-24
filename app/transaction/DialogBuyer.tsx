import { BuyerResponse, BuyerRequest } from "@/data/BuyerData";
import { InputSuggestionBuyer } from "@/components/InputSuggestion";
import React, { useState, useEffect } from "react";
import { endpoint } from "@/utils/endpoint";
import { toStringfy } from "@/lib/utils";
import { WebResponse } from "@/data/WebResponse";
import { Input } from "postcss";

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
        const result: WebResponse<BuyerResponse[]> = await fetcher.json();
        setCustSuggest(result.data);
        setIsHintHidden(result.data.length == 0);
      };
      custNameFetcher();
    }
  }, [custName]);

  const custChangeName = (value: BuyerResponse, custName: string) => {
    setCustSelected(value);
    setCustName(custName);
    setIsHintHidden(custName.length == 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (custSelected == undefined && custName.length > 0) {
      saveCustomer();
    }
    if (custSelected != undefined) {
      onSubmit(custSelected);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-white font-medium">Nama Pemesan</label>
        <InputSuggestionBuyer
          isHidenSuggestion={isHintHidden}
          suggestionItem={custSuggest}
          nameOnChange={custChangeName}
          setName={setCustSuggest}
        ></InputSuggestionBuyer>
        <label>No Telp</label>
        <input
          type="text"
          value={phone}
          onChange={(ph) => setPhone(ph.target.value)}
        ></input>
        <button type="submit">Pilih</button>
      </div>
    </form>
  );
};
