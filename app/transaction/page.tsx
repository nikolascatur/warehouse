import { Container } from "@/components/Container";
import { InputTransaction } from "./input";
import { GoodsResponse } from "@/data/GoodsData";
import { endpoint } from "@/utils/endpoint";
import { WebResponse } from "@/data/WebResponse";

async function getGoods(): Promise<GoodsResponse[]> {
  try {
    const response = await fetch(`${endpoint}/goods`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to get Data");
    }
    const data: WebResponse<GoodsResponse[]> = await response.json();
    return data.data;
  } catch (error) {
    throw new Error("Failed Call Data");
  }
}

export default async function Page() {
  const call: GoodsResponse[] = await getGoods();
  return (
    <Container
      as="main"
      className="w-full flex flex-col m-5 bg-slate-500 border-spacing-y-16 rounded-xl"
    >
      <div className="flex flex-col">
        <InputTransaction />
      </div>
    </Container>
  );
}
