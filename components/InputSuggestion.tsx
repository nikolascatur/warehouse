import React, { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { BuyerResponse } from "@/data/BuyerData";
import { Buyer } from "@prisma/client";

interface PropInputSuggestion {
  suggestionItem: BuyerResponse[] | null;
  nameOnChange: (buyer: BuyerResponse | null, name: string) => void;
  setName: (buyers: BuyerResponse[]) => void;
  isHidenSuggestion: boolean;
}

export const InputSuggestionBuyer: React.FC<PropInputSuggestion> = ({
  suggestionItem,
  nameOnChange,
  setName,
  isHidenSuggestion,
}) => {
  const [isHintHidden, setIsHintHidden] = useState<boolean>(true);
  const [goodName, setGoodName] = useState<string>("");
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerResponse | null>(
    null
  );

  useEffect(() => {
    setIsHintHidden(isHidenSuggestion);
  }, [isHidenSuggestion]);

  const updateInput = (buyer: BuyerResponse) => {
    console.log(
      `AAAAAAAAAAAAAAAAAAAAAAA ${buyer.buyer_name} phone ${buyer.phone}`
    );
    setSelectedBuyer(buyer);
    nameOnChange(buyer, goodName);
    setGoodName(buyer.buyer_name);
    setName([]);
    setIsHintHidden(true);
  };

  useEffect(() => {
    nameOnChange(selectedBuyer, goodName);
  }, [goodName]);

  return (
    <Command>
      <CommandInput
        value={goodName}
        onValueChange={setGoodName}
        placeholder="Nama Pembeli"
      />
      <CommandList className="absolute my-10 bg-slate-800 rounded-lg z-10">
        <CommandEmpty hidden={true}></CommandEmpty>
        <CommandGroup hidden={isHintHidden}>
          {suggestionItem?.map((buyer) => (
            <CommandItem
              className="text-white"
              key={buyer.id + "suggestion"}
              onKeyDown={() => {
                updateInput(buyer);
              }}
              onSelect={() => {
                updateInput(buyer);
              }}
            >
              {`${buyer.buyer_name}`}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
