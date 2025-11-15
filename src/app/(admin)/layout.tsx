import Providers from "@/components/providers/Providers";

export default function AdminGroupLayout({
    children
}: {
    children: React.ReactNode;
}) {
    // Admin routes don't need Navbar and Footer
    return (
        <Providers>
            {children}
        </Providers>
    );
}

