import { Container } from "@/components/Container";
import { GoodList } from "@/components/GoodList";

export default function Page() {
    return (
        <Container as='main' className="w-2/3 flex flex-col">
            <div className="flex flex-col">
                <GoodList />
            </div>
        </Container>
    )
}