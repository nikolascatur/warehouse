import { Container } from "./Container";

export const Navigation = () => {
  return (
    <div className="sticky top-0">
      <Container className="flex flex-col justify-between py-5">
        <ul>
          <li>
            <a href="/goods">Tambah barang</a>
          </li>
          <li>
            <a href="/transaction">Transaksi</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </Container>
    </div>
  );
};
