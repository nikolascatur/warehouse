import { Container } from "@/components/Container";
import { GoodList } from "@/components/GoodList";

export default function Page() {
  return (
    <Container>
      <div className="flex flex-col">
        <GoodList />
      </div>
    </Container>
  );
}
