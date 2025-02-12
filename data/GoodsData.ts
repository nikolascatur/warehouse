export type GoodsRequestData = {
    name: string,
    price: bigint,
    sellPrice: bigint,
    discount: number,
    stock: number,
    barcode: string
}

export type GoodsResponse = {
    index: number,
    id: string,
    name: string,
    price: bigint,
    sellPrice: bigint,
    discount: number,
    stock: number,
    barcode: string
}