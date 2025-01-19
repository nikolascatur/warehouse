import { Container } from "./Container"



export const Navigation = () => {
    return <div className='sticky top-0'>
        <Container className='flex flex-col justify-between py-5'>
            <div>Tambah barang</div>
            <div>Transaksi</div>
            <div>About</div>

        </Container>
    </div>
}