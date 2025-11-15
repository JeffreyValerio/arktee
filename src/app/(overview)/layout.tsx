import { Footer, Navbar } from "@/components";
import Providers from "@/components/providers/Providers";

export default function OverviewLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <Navbar />
            {children}
            <Footer />
        </Providers>
    );
} 