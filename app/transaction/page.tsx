import { Container } from "@/components/Container";
import { InputTransaction } from "./input";


export default function Page() {
    return (
        <Container as='main' className="w-full flex flex-col m-5 bg-slate-500 border-spacing-y-16 rounded-xl">
            <InputTransaction/>
        </Container>
    )
}