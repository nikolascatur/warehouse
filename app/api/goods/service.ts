import { GoodsResponse } from "@/data/GoodsData";
import { Goods } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

class GoodService {
  constructor(private prismaClient: PrismaClient) {}

  private static _instance: GoodService;

  public static get Instance() {
    return this._instance || (this._instance = new this(new PrismaClient()));
  }

  toGoods(id: number, response: Goods): GoodsResponse {
    return {
      index: id,
      id: response.id,
      name: response.name,
      price: response.price,
      sellPrice: response.sell_price,
      discount: response.discount,
      stock: response.stock,
      barcode: response.barcode,
    };
  }

  private async getGoods(): Promise<GoodsResponse[]> {
    const datas = await this.prismaClient.goods.findMany();
    return datas.map((data: Goods, index: number) =>
      this.toGoods(index + 1, data)
    );
  }

  async getGoodsId(text: string): Promise<GoodsResponse[]> {
    console.log(`nikoo PARQAMAMMM ${text === ""}`);
    if (text === "") {
      const datas = await this.prismaClient.goods.findMany();
      return datas.map((data: Goods, index: number) =>
        this.toGoods(index + 1, data)
      );
    } else {
      const goods = await this.prismaClient.goods.findMany({
        where: {
          name: {
            contains: text,
          },
        },
      });
      return goods.map((data: Goods, index: number) =>
        this.toGoods(index + 1, data)
      );
    }
  }

  async deleteGoods(id: string): Promise<GoodsResponse[]> {
    const deleteGoods = await this.prismaClient.goods.deleteMany({
      where: {
        id: id,
      },
    });
    const data = await this.prismaClient.goods.findMany();
    return data.map((data: Goods, index: number) =>
      this.toGoods(index + 1, data)
    );
  }
}

export const goodServiceInstance = GoodService.Instance;
