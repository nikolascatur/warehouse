export type GoodsRequestData = {
    name: string,
    price: number,
    sellPrice: number,
    discount: number,
    stock: number,
    barcode: string
}

export type GoodsResponse = {
    index: number,
    id: string,
    name: string,
    price: number,
    sellPrice: number,
    discount: number,
    stock: number,
    barcode: string
}