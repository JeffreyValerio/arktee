import { Footer, Navbar } from "@/components";

export default function OverviewLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
} 